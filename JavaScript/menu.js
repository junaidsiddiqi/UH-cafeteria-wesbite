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

    function addItemToCart(itemName, itemPrice, quantity) {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span>${quantity}x ${itemName}</span>
            <span class="cart-item-price">$${(itemPrice * quantity).toFixed(2)}</span>
            <i class="fas fa-times remove-item"></i>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += itemPrice * quantity;
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        const removeIcon = cartItem.querySelector('.remove-item');
        removeIcon.addEventListener('click', () => {
            removeItemFromCart(itemPrice * quantity);
            cartItemsContainer.removeChild(cartItem);
        });
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
    function removeItemFromCart(itemPrice) {
        totalPrice -= itemPrice;
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
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

    // Event listener for the checkout button
    document.querySelector('.order .button').addEventListener('click', function() {
        openCart(); // Open the cart sidebar when the order button is clicked
    });

    // Event listener for the checkout button in the cart sidebar
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        
        const cartItemsContainer = document.querySelector('.cart-items');

        // Check if the cart is empty
        if (cartItemsContainer.children.length === 0) {
            return;
        }

        // Display a confirmation message
        alert('Thank you for your order!');

        // Refresh the page
        window.location.reload();
    });

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
});