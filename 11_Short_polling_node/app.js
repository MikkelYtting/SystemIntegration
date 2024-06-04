import express from "express";

const app = express();

// Serve static files from the "public" directory
app.use(express.static("public"));

let randomNumbers = [1, 34, 843];

// Endpoint to get the current list of random numbers
app.get("/randomNumbers", (req, res) => {
    res.send({ data: randomNumbers });
});

// Function to generate a random integer between min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Function to update random numbers array periodically
function updateRandomNumbers() {
    randomNumbers = Array.from({ length: 3 }, () => getRandomInt(1, 1000));
}

// Update random numbers every second SHORT POLLING
setInterval(updateRandomNumbers, 1000);

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
