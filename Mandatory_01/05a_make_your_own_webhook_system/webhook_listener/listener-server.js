const axios = require('axios');

// URL af simons ngrok
const theirRegistrationUrl = '';

// min listener ngrok link
const yourWebhookUrl = '';

// The events you're interested in
const events = ['payment_received', 'invoice_processed']; 

axios.post(theirRegistrationUrl, {
    url: yourWebhookUrl,
    events: events
})
.then(response => {
    console.log('Registration successful', response.data);
})
.catch(error => {
    console.error('Registration failed', error);
});
