function calculateTotal() {
    let total = 0;
    const items = document.querySelectorAll('.box');
    items.forEach(item => {
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.querySelector('section').textContent.slice(1));
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        total += price * quantity;
    });
    return total.toFixed(2);
}

// Function to display the order summary and total amount
function displayOrderSummary() {
    let summary = "";
    const items = document.querySelectorAll('.box');
    items.forEach(item => {
        const name = item.querySelector('h3').textContent;
        const price = parseFloat(item.querySelector('section').textContent.slice(1));
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const subtotal = price * quantity;
        summary += `${name}: $${subtotal.toFixed(2)}<br>`;
    });
    document.getElementById('orderSummary').innerHTML = summary;
    document.getElementById('totalAmount').textContent = `Total: $${calculateTotal()}`;
}

// Call displayOrderSummary when the page is loaded
window.onload = displayOrderSummary;