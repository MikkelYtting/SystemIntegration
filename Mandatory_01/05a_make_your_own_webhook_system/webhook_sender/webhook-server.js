// choco install ngrok
// ngrok config add-authtoken 2e0I80o8MO2sMQI4UMekNTiisqh_6DSLZzo7YGDaHAgspzqhS
// npm i express
// npm install express body-parser
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const app = express();
const db = new Datastore({ filename: 'webhooks.db', autoload: true });

app.use(bodyParser.json());

// Define supported events
const SUPPORTED_EVENTS = ['payment_received', 'payment_processed', 'invoice_processing', 'invoice_completed'];

// Register a webhook
app.post('/register', (req, res) => {
    const { url, events } = req.body;

    // Validate URL...
    // This is where you might add further validation for the URL if needed

    // Check if all requested events are supported
    const allEventsSupported = events.every(event => SUPPORTED_EVENTS.includes(event));

    if (!allEventsSupported) {
        return res.status(400).send({error: "One or more events are not supported."});
    }

    db.insert({ url, events }, (err, newDoc) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(newDoc);
    });
});

// Unregister a webhook
app.post('/unregister', (req, res) => {
    const { url } = req.body;
    // Validate URL...
    // Here you could also add logic to ensure the URL is formatted correctly

    db.remove({ url: url }, {}, (err, numRemoved) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ removed: numRemoved });
    });
});

// Ping endpoint
app.get('/ping', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            return res.status(500).send('Error fetching registered webhooks.');
        }

        const testPayload = { message: 'This is a test payload' };
        
        docs.forEach(doc => {
            axios.post(doc.url, testPayload)
                .catch(error => console.error(`Error calling webhook ${doc.url}:`, error));
        });

        res.status(200).send('Pinged all registered webhooks.');
    });
});

// Start the server
app.listen(3000, () => console.log('Webhook system running on port 3000'));


// step 1: node webhook-server.js
// step 2: I en anden terminal: ngrok http 3000
// i postman: GET https://XXXX-80-71-142-22.ngrok-free.app/ping, linket ændrer sig hvergang
// tjek det virker i http://127.0.0.1:4040/inspect/http
// register og unregister, blvier updateres i webhooks.db.