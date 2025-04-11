document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Balade en Limousine", price: 2000, image: "assets/limousine.jpg" },
        { name: "Loge au Parc Des Princes", price: 30000, image: "assets/psg.jpg" },
        { name: "Entree VIP à l'Arc", price: 15000, image: "assets/club.jpeg" },
        { name: "Diner gastronomique", price: 2000, image: "assets/diner.jpg" },
        { name: "Bateau mouche privatisé", price: 5000, image: "assets/bateau.jpg" },
        { name: "Séance SPA de luxe", price: 1200, image: "assets/spa.jpg" }
    ];

    const activitiesContainer = document.getElementById("activities-container");
    const totalPriceElement = document.getElementById("total-price");
    const payerButton = document.getElementById("payer-button");

    let totalPrice = 0;

    function updateTotal() {
        const checkedBoxes = Array.from(document.querySelectorAll(".activity-checkbox:checked"));
        totalPrice = checkedBoxes.reduce((sum, checkbox) => sum + parseInt(checkbox.dataset.price), 0);
        totalPriceElement.textContent = `${totalPrice}€`;

        // Affiche ou cache le bouton "Payer"
        payerButton.style.display = totalPrice > 0 ? "inline-block" : "none";
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
        image.onerror = () => { image.src = "images/default.jpg"; };

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

    // Clique sur le bouton "Payer"
    payerButton.addEventListener("click", () => {
        window.location.href = "paiement.html";
    });

    updateTotal(); // Pour initialiser correctement
});
