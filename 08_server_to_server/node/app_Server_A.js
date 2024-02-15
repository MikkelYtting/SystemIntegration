import express from "express";
const app = express();


// Den her tager fra  python main.py (Server B)
// Kør først nodemon app_Server_A-js
// For at se http://localhost:8080/requestfastapi
app.get("/requestfastapi", async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/fastapiData")
    const result = await response.json();
    res.send({ data: result});
});

// Server B (Python main) skal tage her fra:
app.get("/expressData", async (req, res) => {
    res.send({isRunning: true});

});

const PORT = 8080;
app.listen(PORT, () => console.log("fafaw",PORT));
