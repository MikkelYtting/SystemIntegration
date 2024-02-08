const fs = require('fs');

// Read the JSON string from the file
fs.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file:", err);
        return;
    }
    try {
        // Deserialize the JSON string back into an object
        const data = JSON.parse(jsonString);
        console.log("Data deserialized:", data);
    } catch (err) {
        console.log("Error parsing JSON:", err);
    }
});
