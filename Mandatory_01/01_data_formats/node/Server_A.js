import express from "express";
import fetch from "node-fetch"; // Du skal importere fetch, hvis du bruger node-fetch version 2.x

const app = express();

// Denne rute henter data fra Python FastAPI-serveren (Server B)
// Start med: nodemon server_A.js
// Besøg derefter: http://localhost:8080/requestfastapi
app.get("/requestfastapi", async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/apiData")
    const result = await response.json();
    res.send({ indhold: result });
});

// Python main (Server B) vil hente data fra denne rute:
app.get("/nodeData", async (req, res) => {
    res.send({status: "Server A kører og er operationel"});
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server A lytter på port ${PORT}`));
