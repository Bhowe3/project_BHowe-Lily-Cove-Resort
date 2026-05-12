function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function groupCart(cart) {
    let grouped = [];

    cart.forEach(item => {
        let existing = grouped.find(i =>
            i.name === item.name &&
            i.size === item.size &&
            i.color === item.color
        );

        if (existing) {
            existing.qty += item.qty;
            existing.total = (parseFloat(existing.total) + parseFloat(item.total)).toFixed(2);
        } else {
            grouped.push({ ...item });
        }
    });

    return grouped;
}

function renderCart() {
    let container = document.getElementById("cart");
    let cart = getCart();
    let groupedCart = groupCart(cart);

    if (!container) return;

    if (groupedCart.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let html = "";
    let grandTotal = 0;

    groupedCart.forEach((item, i) => {

        grandTotal += parseFloat(item.total);

        let product = products.find(p => p.name === item.name);

        html += `
        <div class="cart-item">
            <h3>${item.name}</h3>

            <label>Size:</label>
            <select onchange="updateItem(${i}, 'size', this.value)">
                ${product.sizes.map(s =>
                    `<option value="${s}" ${item.size === s ? "selected" : ""}>${s}</option>`
                ).join("")}
            </select>
        `;

        if (product.colors) {
            html += `
            <label>Color:</label>
            <select onchange="updateItem(${i}, 'color', this.value)">
                ${product.colors.map(c =>
                    `<option value="${c}" ${item.color === c ? "selected" : ""}>${c}</option>`
                ).join("")}
            </select>
            `;
        }

        html += `
            <p>Qty: ${item.qty}</p>
            <p><strong>$${item.total}</strong></p>

            <button onclick="removeItem(${i})">Remove</button>
        </div>
        `;
    });

    html += `<h2>Total: $${grandTotal.toFixed(2)}</h2>`;

    container.innerHTML = html;
}

function removeItem(index) {
    let cart = getCart();
    let grouped = groupCart(cart);

    if (grouped[index].qty > 1) {
        let unit = parseFloat(grouped[index].total) / grouped[index].qty;
        grouped[index].qty -= 1;
        grouped[index].total = (unit * grouped[index].qty).toFixed(2);
    } else {
        grouped.splice(index, 1);
    }

    saveCart(grouped);
    renderCart();
}

function updateItem(index, field, value) {
    let cart = getCart();
    let grouped = groupCart(cart);

    let product = products.find(p => p.name === grouped[index].name);

    if (field === "size" && !product.sizes.includes(value)) return;
    if (field === "color" && product.colors && !product.colors.includes(value)) return;

    grouped[index][field] = value;

    saveCart(grouped);
    renderCart();
}

window.onload = renderCart;