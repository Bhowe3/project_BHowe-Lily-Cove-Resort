const names = [
  "William A.",
  "Henry E.",
  "Bruce W.",
  "Peter P.",
  "Tony S."
];

const reviews = [
  "Absolutely beautiful place! The gardens were stunning.",
  "Loved the live music event. Very relaxing stay.",
  "Rooms were clean and staff was super friendly.",
  "Bonfire night was my favorite part!",
  "Would definitely come back again!"
];

const ratings = [5, 4, 5, 4, 5];

function showReviews() {
  let output = "";

  for (let i = 0; i < names.length; i++) {
    output += "<p><strong>" + names[i] + "</strong><br>";
    output += "Rating: " + ratings[i] + "/5<br>";
    output += reviews[i] + "</p><hr>";
  }

  document.getElementById("reviewOutput").innerHTML = output;
}