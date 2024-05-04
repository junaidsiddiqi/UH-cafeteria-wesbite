document.addEventListener('DOMContentLoaded', function() {
    // Functional Food Tabs
    let list = document.querySelectorAll(".list li");
    let boxes = document.querySelectorAll(".box");

    list.forEach((el) => {
        el.addEventListener("click", (e) => {
            list.forEach((el1) => {
                el1.style.color = "whitesmoke";
            });
            e.target.style.color = "#f2c641";

            boxes.forEach((el2) => {
                el2.style.display = "none";
            });
            document.querySelectorAll(e.target.dataset.filter).forEach((li) => {
                li.style.display = "flex";
            });
        });
    });

    // Add To Shopping Cart Coding
    const addToCartIcons = document.querySelectorAll('.add-to-cart');
    const cartSidebar = document.getElementById('sidebar');
    const cartCloseButton = document.querySelector('.sidebar-close');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.getElementById('cart-icon');

    let totalPrice = 0;
    let cartItems = [];

    function addItemToCart(itemName, itemPrice, quantity) {
        // Check if the item is already in the cart
        const existingItem = cartItems.find(item => item.name === itemName);
        if (existingItem) {
            // Check if adding the new quantity exceeds the limit of 10
            if (existingItem.quantity + quantity <= 10) {
                existingItem.quantity += quantity;
            } else {
                // If exceeding, set the quantity to the maximum limit of 10
                existingItem.quantity = 10;
            }
        } else {
            // If not in the cart, add a new item
            cartItems.push({ name: itemName, price: itemPrice, quantity: Math.min(quantity, 10) });
        }

        // Render cart items
        renderCartItems();
    }

    function renderCartItems() {
        // Clear previous items
        cartItemsContainer.innerHTML = '';
        totalPrice = 0;

        // Render new items
        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.quantity}x ${item.name}</span>
                <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                <i class="fas fa-times remove-item"></i>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        // Update total price
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function removeItemFromCart(itemName, itemPrice, quantity) {
        // Remove the item from the cartItems array
        const index = cartItems.findIndex(item => item.name === itemName);
        if (index !== -1) {
            cartItems.splice(index, 1);
        }

        // Re-render cart items
        renderCartItems();
    }

    addToCartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const parentBox = icon.closest('.box');
            const itemName = parentBox.querySelector('h3').textContent;
            const itemPrice = parseFloat(parentBox.querySelector('section').textContent.slice(1));
            const quantity = parseInt(parentBox.querySelector('.quantity-input').value);
            
            if (!isNaN(quantity) && quantity > 0 && quantity <= 10) {
                addItemToCart(itemName, itemPrice, quantity);
            } else {
                alert('Please enter a valid quantity between 1 and 10.');
            }
        });
    });

    // Function to open the cart sidebar
    function openCart() {
        cartSidebar.classList.add('open');
    }

    // Function to close the cart sidebar
    function closeCart() {
        cartSidebar.classList.remove('open');
    }

    // Function to remove item from cart
    function removeItemFromCart(itemName, itemPrice, quantity) {
        // Remove the item from the cartItems array
        const index = cartItems.findIndex(item => item.name === itemName);
        if (index !== -1) {
            cartItems.splice(index, 1);
        }

        // Re-render cart items
        renderCartItems();
    }

    // Event listener for clicking the cart icon
    cartIcon.addEventListener('click', function() {
        if (cartSidebar.classList.contains('open')) {
            closeCart(); 
        } else {
            openCart(); 
        }
    });

    // Event listener for cart close button
    cartCloseButton.addEventListener('click', () => {
        closeCart();
    });

    // Define the function to handle the checkout event
    function handleCheckout() {
        const cartItemsContainer = document.querySelector('.cart-items');

        // Check if the cart is empty
        if (cartItemsContainer.children.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        // Display a confirmation message
        const confirmationMessage = confirm('Thank you for your order! Click OK to proceed to the order confirmation page.');
        
        // If the user confirms, redirect to confirmation page
        if (confirmationMessage) {
            window.location.href = 'confirmation.html';
        }
    }

    // Remove the previous event listener for the checkout button in the cart sidebar, if any
    document.querySelector('.checkout-btn').removeEventListener('click', handleCheckout);

    // Add event listener for the checkout button in the cart sidebar
    document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);

    // Quantity control event listeners
    document.querySelectorAll('.quantity-control').forEach(control => {
        control.addEventListener('click', () => {
            const input = control.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);

            if (control.classList.contains('quantity-up')) {
                if (value < 10) { 
                    input.value = ++value;
                }
            } else {
                input.value = value > 1 ? --value : 1;
            }
        });
    });

    // Event listener for the order now button
    document.querySelector('.order .button').addEventListener('click', function() {
        openCart();
    });
});
