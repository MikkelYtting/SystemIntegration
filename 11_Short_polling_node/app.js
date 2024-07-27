import express from "express";

const app = express();

// Server statiske filer fra "public" mappen
app.use(express.static("public"));

let randomNumbers = [1, 34, 843];

// Endpoint til at hente den aktuelle liste af tilfældige numre
app.get("/randomNumbers", (req, res) => {
    res.send({ data: randomNumbers }); // svarer med de aktuelle tilfældige numre
});

// Funktion til at generere et tilfældigt heltal mellem min og max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Funktion til at opdatere arrayet med tilfældige numre periodisk
function updateRandomNumbers() {
    randomNumbers = Array.from({ length: 3 }, () => getRandomInt(1, 1000));
}

// Opdater tilfældige numre hvert sekund (SHORT POLLING)
setInterval(updateRandomNumbers, 1000);

const PORT = 8080;
app.listen(PORT, () => console.log("Serveren kører på port", PORT));
