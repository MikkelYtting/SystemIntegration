import express from "express";
const app = express();


// Endpoint, der henter data fra FastAPI-serveren
app.get("/requestfastapi", async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/fastapiData")
    const result = await response.json();
    res.send({ data: result});
});

// Endpoint, der returnerer statiske data
app.get("/expressData", async (req, res) => {

    // Håndterer GET-forespørgsler på /expressData.
    // Returnerer en JSON-objekt med en key "isRunning" sat til true.
    res.send({isRunning: true});

});

// Starter Express-serveren på port 7000
const PORT = 7000;
app.listen(PORT, () => console.log("Server A kører på port",PORT));






// Kør først nodemon app_Server_A-js
// For at se http://localhost:7000/requestfastapi