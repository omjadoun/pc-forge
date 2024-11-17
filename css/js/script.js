function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
// Function to store selected product data in the database
function selectProduct(productId, productName, price, quantity) {
    // Send data to PHP using AJAX
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "save_product.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Create data string for POST request
    const data = `product_id=${productId}&product_name=${encodeURIComponent(productName)}&price=${price}&quantity=${quantity}`;
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert(response.message);
            } else {
                alert("Error: " + response.message);
            }
        }
    };

    xhr.send(data);
}

// Example of using the function when clicking the "Select" button
document.querySelectorAll('.select-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.getAttribute('data-product-id'); // Assume product ID is set in data attribute
        const productName = button.getAttribute('data-product-name'); // Product name
        const price = parseFloat(button.getAttribute('data-price')); // Price in data attribute
        const quantity = parseInt(document.getElementById(`${productId}-quantity`).innerText); // Quantity for specific product

        // Call selectProduct function
        selectProduct(productId, productName, price, quantity);
    });
});
