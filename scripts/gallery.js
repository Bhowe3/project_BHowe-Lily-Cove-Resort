window.onload = function () {

    let images = [
        {src: "../images/photo1.png", caption: "Lily Cove Resort View"},
        {src: "../images/photo2.png", caption: "Lily Cove Lake Side"},
        {src: "../images/photo3.png", caption: "Lily Cove Forest Walk"},
        {src: "../images/photo4.png", caption: "Lily Cove Back Patio "},
        {src: "../images/photo5.png", caption: "Lily Cove Dining Area"},
        {src: "../images/photo6.png", caption: "Lily Cove Hiking Trail"}
    ];

    let gallery = document.getElementById("gallery");
    let currentIndex = 0;
    const visibleCount = 4;

    function renderGallery() {
        gallery.innerHTML = "";

        for (let i = currentIndex; i < currentIndex + visibleCount && i < images.length; i++) {
            let img = document.createElement("img");
            img.src = images[i].src;
            img.alt = images[i].caption;

            img.onclick = function () {
                document.getElementById("viewer").style.display = "block";
                document.getElementById("viewerImg").src = images[i].src;
                document.getElementById("caption").textContent = images[i].caption;
            };

            gallery.appendChild(img);
        }
    }

    document.getElementById("nextBtn").onclick = function () {
        if (currentIndex + visibleCount < images.length) {
            currentIndex++;
            renderGallery();
        }
    };

    document.getElementById("prevBtn").onclick = function () {
        if (currentIndex > 0) {
            currentIndex--;
            renderGallery();
        }
    };

    window.closeViewer = function () {
        document.getElementById("viewer").style.display = "none";
    };

    renderGallery();
};