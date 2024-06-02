require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const cors = require('cors'); // Tilføj denne linje

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Brug CORS middleware
app.use(cors()); // Tilføj denne linje

// Middleware til at servere statiske filer (inkluderer client.html)
app.use(express.static('public'));

// Middleware til at parse JSON anmodninger, bortset fra webhooks
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    }
  })
);

// Endpoint til at oprette en betalingsintention
app.post('/create-payment-intent', async (req, res) => {
  console.log('Received request to /create-payment-intent');
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint til at håndtere Stripe webhooks
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!', paymentIntent);
  }

  res.json({ received: true });
});

// Starter serveren på den specificerede port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
