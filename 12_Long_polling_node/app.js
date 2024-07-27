import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let clients = []; // Array til at gemme klienternes svarobjekter

// Server index.html filen ved rod-URL'en
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send index.html filen til klienten
});

// Endpoint til at abonnere på pubs (LONG POLLING)
app.get("/events/subscribe", (req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Sæt content-type til JSON, så klienten ved, hvordan den skal parse dataene
    res.setHeader('Cache-Control', 'no-cache'); // Forhindre caching
    res.setHeader('Connection', 'keep-alive'); // Hold forbindelsen åben

    clients.push(res); // Tilføjer klientens svarobjekt til clients-arrayet

    req.on("close", () => {
        clients = clients.filter(client => client !== res); // Fjern klienten fra arrayet, når forbindelsen lukkes
    });
});

// Endpoint til at sende data til alle subs
app.get("/events/publish", (req, res) => {
    const newData = { data: "This is a new message" }; // De nye data, der skal sendes til klienterne

    clients.forEach(client => {
        client.json(newData); // Send de nye data til hver klient
    });

    clients = []; // Ryd listen over klienter

    res.status(204).end(); 
});

const PORT = 8080;
app.listen(PORT, () => console.log("Serveren kører på port", PORT)); 
