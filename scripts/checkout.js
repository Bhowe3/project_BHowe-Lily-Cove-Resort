function getCart(){
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function renderSummary(){
    let cart = getCart();
    let html = "";
    let total = 0;

    cart.forEach(item=>{
        total += parseFloat(item.total);

        html += `<p>${item.name} (${item.size}) 
        ${item.color ? "- " + item.color : ""}
        x ${item.qty} = $${item.total}</p>`;
    });

    html += `<h3>Total: $${total.toFixed(2)}</h3>`;

    document.getElementById("summary").innerHTML = html;
}

function validateForm(){
    let cart = getCart();

    if (!cart || cart.length === 0) {
        document.getElementById("error").innerHTML = "Your cart is empty.";
        return false;
    }

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    if(name.length < 2 || !email.includes("@") || address.length < 5){
        document.getElementById("error").innerHTML = "Fix your inputs.";
        return false;
    }

    alert("Order Complete!");
    localStorage.removeItem("cart");
    return true;
}

window.onload = renderSummary;