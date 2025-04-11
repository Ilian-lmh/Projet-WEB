document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Balade en Limousine", price: 200, image: "assets/limousine.jpg" },
        { name: "Bouteille de Champagne", price: 100, image: "assets/champagne.png" },
        { name: "Entree VIP en Club", price: 150, image: "assets/club.jpeg" },
        { name: "Diner gastronomique", price: 80, image: "assets/diner.jpg" },
        { name: "Seance SPA de luxe", price: 120, image: "assets/spa.jpg" }
    ];

    const activitiesContainer = document.getElementById("activities-container");
    const totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    function updateTotal() {
        totalPrice = Array.from(document.querySelectorAll(".activity-checkbox:checked"))
            .reduce((sum, checkbox) => sum + parseInt(checkbox.dataset.price), 0);
        totalPriceElement.textContent = `${totalPrice}euro`;
    }

    activities.forEach((activity, index) => {
        const activityDiv = document.createElement("div");
        activityDiv.classList.add("activity-item");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("activity-left");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("activity-checkbox");
        checkbox.dataset.price = activity.price;
        checkbox.id = `activity-${index}`;
        checkbox.addEventListener("change", () => {
            button.textContent = checkbox.checked ? "Supprimer" : "Ajouter";
            updateTotal();
        });

        const image = document.createElement("img");
        image.src = activity.image;
        image.alt = activity.name;
        image.classList.add("activity-image");
        image.onerror = () => { image.src = "images/default.jpg"; }; // Fallback image

        const label = document.createElement("label");
        label.textContent = `${activity.name} - ${activity.price}€`;
        label.setAttribute("for", `activity-${index}`);

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(image);
        leftDiv.appendChild(label);

        const button = document.createElement("button");
        button.textContent = "Ajouter";
        button.classList.add("activity-button");
        button.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked;
            button.textContent = checkbox.checked ? "Supprimer" : "Ajouter";
            updateTotal();
        });

        activityDiv.appendChild(leftDiv);
        activityDiv.appendChild(button);
        activitiesContainer.appendChild(activityDiv);
    });
});