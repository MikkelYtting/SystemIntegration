const express = require('express');
const app = express();
const PORT = 3000;

// Serverer en simpel HTML-side med SSE-eksempel
app.get('/', (req, res) => {
    res.send(`
        <h2>Server-Sent Events (SSE) Example</h2>
        <pre id="data"></pre>
        <script>
            const evtSource = new EventSource("/events");
            evtSource.onmessage = function(event) {
                const dataElement = document.getElementById("data");
                dataElement.innerHTML += event.data + "\\n";
            }
        </script>
    `);
});

// Endpoint for at sende tid som Server-Sent Events (SSE)
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendTime = () => {
        // Genererer en lokal tidsstreng uden at konvertere til UTC
        const now = new Date();
        const localTime = now.toLocaleString(); // Konverterer til lokal tidsstreng baseret på serverens lokale tid
        res.write(`data: ${localTime}\n\n`);
    };

    sendTime();
    const intervalId = setInterval(sendTime, 1000); // Sender tid hvert sekund

    req.on('close', () => {
        clearInterval(intervalId); // Rydder intervallet ved afbrydelse
    });
});

// Starter serveren
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
