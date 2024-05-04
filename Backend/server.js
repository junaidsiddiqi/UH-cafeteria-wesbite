const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define routes
app.get('/', (req, res) => {
    // Render your menu page here
    res.render('menu');
});

// POST request handler for order submission
app.post('/order', (req, res) => {
    // Process form data (calculate total amount)
    const { item1, item2, item3 } = req.body;
    const totalAmount = calculateTotal(item1, item2, item3);

    // Render order confirmation page and pass total amount
    res.render('order_confirmation', { totalAmount });
});

// Function to calculate total amount
function calculateTotal(item1, item2, item3) {
    // Your calculation logic here
    // Example: return parseFloat(item1) + parseFloat(item2) + parseFloat(item3);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
