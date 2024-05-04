const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// POST request handler for order submission
app.post('/order', (req, res) => {
    // Process form data (calculate total amount)
    const { item1, item2, item3 } = req.body;
    const totalAmount = calculateTotal(item1, item2, item3);

    // Retrieve cart items from localStorage
    const cartItems = req.session.cartItems || [];

    // Food items and their prices
    const foodItems = {
        Pancakes: 5,
        Waffles: 5,
        'Breakfast Burrito': 8,
        Oatmeal: 7,
        Burger: 12,
        Salad: 8,
        Pizza: 15,
        Sandwich: 10,
        Pasta: 20,
        Steak: 25,
        Lasagna: 14,
        Salmon: 20,
        Chips: 2,
        Candy: 3,
        Cookies: 5,
        'Fruit Bowl': 8,
        Water: 2,
        Tea: 4,
        Soda: 2,
        'Energy Drink': 2
    };

    // Render order confirmation page and pass cart items, total amount, and food items
    res.render('order_confirmation', { cartItems, totalAmount, foodItems });
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