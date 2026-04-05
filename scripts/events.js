function calculateEventCost() {
    let total = 0;

    let options = document.querySelectorAll("#eventForm input[type=checkbox]");

    options.forEach(option => {
        if (option.checked) {
            total += Number(option.value);
        }
    });

    document.getElementById("eventTotal").textContent = "$" + total.toFixed(2);
}