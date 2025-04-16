document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Saut en parachute sur la plage", price: 2500, image: "assets/capetown/parachute_capetown.jpg" },
        { name: "Plongée avec les requins", price: 3000, image: "assets/capetown/sharks.jpg" },
        { name: "Randonnée Table Mountain", price: 800, image: "assets/capetown/tablemountain.jpg" },
        { name: "Surf Camp", price: 1500, image: "assets/capetown/surf.avif" },
        { name: "Tyrolienne au-dessus de la jungle", price: 1700, image: "assets/capetown/zipline.jpg" }
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