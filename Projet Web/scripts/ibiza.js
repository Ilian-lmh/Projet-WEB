document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Soir�e au Pacha avec table VIP", price: 3200, image: "assets/pacha.jpg" },
        { name: "Croisi�re priv�e avec open bar", price: 4500, image: "assets/croisiere.jpg" },
        { name: "Brunch sunset � Cala Bassa Beach Club", price: 1500, image: "assets/cala.jpg" },
        { name: "Pool Party au Ushua�a", price: 3000, image: "assets/ushuaia.jpg" },
        { name: "Excursion en jetski autour de l'�le", price: 2500, image: "assets/jetski.jpg" },
        { name: "Session d�tente dans un spa face mer", price: 1000, image: "assets/spa.jpg" }
    ];

    const activitiesContainer = document.getElementById("activities-container");
    const totalPriceElement = document.getElementById("total-price");
    const payerButton = document.getElementById("payer-button");

    let totalPrice = 0;

    function updateTotal() {
        const checkedBoxes = Array.from(document.querySelectorAll(".activity-checkbox:checked"));
        totalPrice = checkedBoxes.reduce((sum, checkbox) => sum + parseInt(checkbox.dataset.price), 0);
        totalPriceElement.textContent = `${totalPrice}�`;

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
        label.textContent = `${activity.name} - ${activity.price}�`;
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