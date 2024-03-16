import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, 'data'); // Data directory

const app = express();
const PORT = 3000;

// Serve files directly from the data directory
app.get('/data/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(dataDir, filename); // Correct file path
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

// Endpoint to fetch data from Server B (Python FastAPI)
app.get('/fetch_from_server_b/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const response = await fetch(`http://localhost:8000/data/${filename}`);
    if (response.ok) {
      const data = await response.text(); // Assuming text data
      res.send(data);
    } else {
      res.status(response.status).send(`Server B responded with status: ${response.status}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server 1 (Node.js) running on port ${PORT}`);
});


// For node data fra samme server
// http://localhost:3000/data/server1_info.json
// http://localhost:3000/data/server1_info.txt
// http://localhost:3000/data/server1_info.xml
// http://localhost:3000/data/server1_info.yaml
// http://localhost:3000/data/server1_info.csv
        
// for at fetche samme data igennem python server 2
// http://localhost:3000/fetch_from_server_b/server2_info.json
// http://localhost:3000/fetch_from_server_b/server2_info.txt
// http://localhost:3000/fetch_from_server_b/server2_info.xml
// http://localhost:3000/fetch_from_server_b/server2_info.yaml
// http://localhost:3000/fetch_from_server_b/server2_info.csv
