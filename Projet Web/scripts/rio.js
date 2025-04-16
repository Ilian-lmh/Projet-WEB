document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Tour en hélicoptère au-dessus du Christ Rédempteur", price: 5000, image: "assets/rio/helico.jpg" },
        { name: "Soirée VIP au Copacabana Palace", price: 3500, image: "assets/rio/copacabana.jpg" },
        { name: "Cours de samba privé avec des pros", price: 800, image: "assets/rio/samba.jpg" },
        { name: "Excursion en yacht autour des îles", price: 4000, image: "assets/rio/yacht.jpg" },
        { name: "Session de surf avec moniteur à Ipanema", price: 1200, image: "assets/rio/surf.jpg" },
        { name: "BBQ brésilien sur la plage avec DJ", price: 2500, image: "assets/rio/bbq.jpg" }
    ];

    const activitiesContainer = document.getElementById("activities-container");
    const totalPriceElement = document.getElementById("total-price");
    const payerButton = document.getElementById("payer-button");

    let totalPrice = 0;

    function updateTotal() {
        const checkedBoxes = Array.from(document.querySelectorAll(".activity-checkbox:checked"));
        totalPrice = checkedBoxes.reduce((sum, checkbox) => sum + parseInt(checkbox.dataset.price), 0);
        totalPriceElement.textContent = `${totalPrice}€`;

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

    payerButton.addEventListener("click", () => {
        window.location.href = "paiement.html";
    });

    updateTotal();
});