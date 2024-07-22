const fs = require('fs');

// Læs JSON-strengen fra filen 'data.json'
fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    try {
        // Deserialiser JSON-strengen tilbage til et objekt
        const data = JSON.parse(jsonString);
        // Udskriv det deserialiserede dataobjekt til konsollen
        console.log("Data deserialized:", data);
    } catch (err) {
        console.log("Error parsing JSON:", err);
    }
});
