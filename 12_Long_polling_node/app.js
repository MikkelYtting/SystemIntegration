import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let clients = [];

// Serve the index.html file for the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to subscribe to events (long polling)
app.get("/events/subscribe", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    clients.push(res);

    req.on("close", () => {
        clients = clients.filter(client => client !== res);
    });
});

// Endpoint to publish new events to subscribed clients
app.get("/events/publish", (req, res) => {
    const newData = { data: "This is a new message" };

    clients.forEach(client => {
        client.json(newData);
    });

    clients = [];

    res.status(204).end();
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
