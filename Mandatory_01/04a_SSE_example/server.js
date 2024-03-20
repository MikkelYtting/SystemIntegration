const express = require('express');
const app = express();
const PORT = 3000;

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

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendTime = () => {
        // Generate a local time string without converting to UTC
        const now = new Date();
        const localTime = now.toLocaleString(); // Converts to local time string based on server's locale
        res.write(`data: ${localTime}\n\n`);
    };

    sendTime();
    const intervalId = setInterval(sendTime, 1000);

    req.on('close', () => {
        clearInterval(intervalId);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
