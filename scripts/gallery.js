window.onload = function () {

    let images = [
        {src: "../images/photo1.png", caption: "Lily Cove Resort View"},
        {src: "../images/photo2.png", caption: "Lily Cove Lake Side"},
        {src: "../images/photo3.png", caption: "Lily Cove Forest Walk"},
        {src: "../images/photo4.png", caption: "Lily Cove Back Patio"},
        {src: "../images/photo5.png", caption: "Lily Cove Dining Area"},
        {src: "../images/photo6.png", caption: "Lily Cove Hiking Trail"}
    ];

    let gallery = document.getElementById("gallery");
    let currentIndex = 0;
    const visibleCount = 3;

    function openViewer(i) {
        const viewer = document.getElementById("viewer");
        viewer.classList.add("active");
        document.getElementById("viewerImg").src = images[i].src;
        document.getElementById("caption").textContent = images[i].caption;
    }

    function closeViewer() {
        document.getElementById("viewer").classList.remove("active");
    }

    function renderGallery() {
        gallery.innerHTML = "";

        for (let i = 0; i < visibleCount; i++) {
            let index = (currentIndex + i) % images.length;

            let img = document.createElement("img");
            img.src = images[index].src;
            img.alt = images[index].caption;

            img.onclick = function () {
                openViewer(index);
            };

            gallery.appendChild(img);
        }
    }

    document.getElementById("nextBtn").onclick = function () {
        currentIndex = (currentIndex + 1) % images.length;
        renderGallery();
    };

    document.getElementById("prevBtn").onclick = function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        renderGallery();
    };

    document.getElementById("closeBtn").onclick = closeViewer;

    document.getElementById("viewer").onclick = function (e) {
        if (e.target.id === "viewer") {
            closeViewer();
        }
    };

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeViewer();
        }
    });

    renderGallery();
};