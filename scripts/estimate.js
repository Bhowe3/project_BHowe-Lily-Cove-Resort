function calculatePrice() {
  let subtotal = 0;

  const room = document.getElementById("room");
  subtotal += Number(room.value);

  if (document.getElementById("tea").checked) subtotal += 25;
  if (document.getElementById("music").checked) subtotal += 20;
  if (document.getElementById("bonfire").checked) subtotal += 15;

  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
  document.getElementById("tax").textContent = "$" + tax.toFixed(2);
  document.getElementById("total").textContent = "$" + total.toFixed(2);
}