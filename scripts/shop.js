const products = [
{
    id:1, name:"Coffee Mug", base:10,
    colors:["White","Black"],
    sizes:["Standard"],
    multiplier:{Standard:1}
},
{
    id:2, name:"T-Shirt", base:20,
    colors:["Blue","Black","White","Green","Pink"],
    sizes:["S","M","L","XL"],
    multiplier:{S:1, M:1.1, L:1.2, XL:1.3}
},
{
    id:3, name:"Plush Toy", base:15,
    sizes:["Small","Medium","Large"],
    multiplier:{Small:1, Medium:1.2, Large:1.4}
},
{
    id:4, name:"Notebook", base:8,
    colors:["Pink","Blue","Red","Green","Yellow","Purple","Orange","Lime","Black","Brown"],
    sizes:["Standard"],
    multiplier:{Standard:1}
},
{
    id:5, name:"Water Bottle", base:12,
    colors:["Blue","Red","Green","Pink","Black","White","Yellow","Purple"],
    sizes:["Small","Medium","Large"],
    multiplier:{Small:1, Medium:1.2, Large:1.4}
}
];


// ✅ IMAGE FIX (THIS WAS MISSING)
const productImages = {
    1: "../images/mug.png",
    2: "../images/tshirt.png",
    3: "../images/plush.png",
    4: "../images/notebook.png",
    5: "../images/bottle.png"
};


function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function calculatePrice(product, size, qty){
    let price = product.base * product.multiplier[size];
    return (price * qty).toFixed(2);
}

function displayProducts(){
    let html = "";

    products.forEach(p => {

        html += `<div class="product">
            <h3>${p.name}</h3>

            <img src="${productImages[p.id]}" alt="${p.name}" class="product-img">

            Size:
            <select id="size-${p.id}" onchange="updatePrice(${p.id})">
                ${p.sizes.map(s => `<option>${s}</option>`).join("")}
            </select><br>`;

        if(p.colors){
            html += `Color:
            <select id="color-${p.id}">
                ${p.colors.map(c => `<option>${c}</option>`).join("")}
            </select><br>`;
        }

        html += `
            Quantity:
            <input type="number" id="qty-${p.id}" value="1" min="1" onchange="updatePrice(${p.id})"><br>

            <p id="price-${p.id}">$${p.base}</p>

            <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });

    document.getElementById("products").innerHTML = html;
}

function updatePrice(id){
    let p = products.find(x => x.id === id);

    let size = document.getElementById(`size-${id}`).value;
    let qty = parseInt(document.getElementById(`qty-${id}`).value);

    let total = calculatePrice(p, size, qty);

    document.getElementById(`price-${id}`).innerText = "$" + total;
}

function addToCart(id){
    let cart = getCart();
    let p = products.find(x => x.id === id);

    let size = document.getElementById(`size-${id}`).value;
    let color = document.getElementById(`color-${id}`)?.value || "";
    let qty = parseInt(document.getElementById(`qty-${id}`).value);

    let existing = cart.find(item =>
        item.id === id &&
        item.size === size &&
        item.color === color
    );

    if(existing){
        existing.qty += qty;
        existing.total = calculatePrice(p, size, existing.qty);
    } else {
        cart.push({
            id:id,
            name:p.name,
            size:size,
            color:color,
            qty:qty,
            total:calculatePrice(p, size, qty)
        });
    }

    saveCart(cart);

    document.getElementById("message").innerText = "Added to cart!";
}

window.onload = displayProducts;