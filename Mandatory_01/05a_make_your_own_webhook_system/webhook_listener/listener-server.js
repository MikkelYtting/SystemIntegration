const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send('Acknowledged');
});

app.listen(4000, () => console.log('Webhook listener running on port 4000'));
