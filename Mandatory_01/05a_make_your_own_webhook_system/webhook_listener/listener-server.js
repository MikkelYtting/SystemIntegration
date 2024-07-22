const axios = require('axios');

// URL af simons ngrok
const SimonRegistrationUrl = '';

// min listener ngrok link
const MyWebhookUrl = '';

const events = ['payment_received', 'invoice_processed']; 

axios.post(SimonRegistrationUrl, {
    url: MyWebhookUrl,
    events: events
})
.then(response => {
    console.log('Registration successful', response.data);
})
.catch(error => {
    console.error('Registration failed', error);
});
