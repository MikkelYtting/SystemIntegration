const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // for parsing application/json

app.post('/webhook', (req, res) => {
    console.log('Received webhook:', req.body);
    // Here you can handle the webhook event accordingly
    res.send('Received!');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
