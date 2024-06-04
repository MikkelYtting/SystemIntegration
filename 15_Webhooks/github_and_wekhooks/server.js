// choco install ngrok
// ngrok config add-authtoken 2e0I80o8MO2sMQI4UMekNTiisqh_6DSLZzo7YGDaHAgspzqhS
// npm i express
// npm install express body-parser

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); 

app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    
    res.send('Received!');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


//  husk at starte både server og ngrok:
//  node server.js
//  ngrok http 3000
//  tjek response: http://127.0.0.1:4040/inspect/http 
//  eller direkte på ngroks traffic inspctor: https://dashboard.ngrok.com/ac_2e0I7zD18BTZXy8wO8xUjYLkut4/observability/traffic-inspector 

// for at sætte localhust op online: https://dashboard.ngrok.com/get-started/setup/windows 