function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart(){
    let cart = getCart();
    let html = "";
    let grandTotal = 0;

    if(cart.length === 0){
        html = "<p>Your cart is empty.</p>";
    } else {

        cart.forEach((item, i) => {
            grandTotal += parseFloat(item.total);

            html += `<div class="cart-item">
                <h3>${item.name}</h3>
                <p>Size: ${item.size}</p>
                ${item.color ? `<p>Color: ${item.color}</p>` : ""}
                <p>Qty: ${item.qty}</p>
                <p><strong>$${item.total}</strong></p>
                <button onclick="removeItem(${i})">Remove</button>
            </div>`;
        });

        html += `<h2>Total: $${grandTotal.toFixed(2)}</h2>`;
    }

    document.getElementById("cart").innerHTML = html;
}

function removeItem(i){
    let cart = getCart();
    cart.splice(i,1);
    saveCart(cart);
    renderCart();
}

window.onload = renderCart;