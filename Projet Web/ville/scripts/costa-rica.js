document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Sources chaudes naturelles à La Fortuna", price: 1500, image: "assets/costa-rica/sources.jpg" },
        { name: "Cours de yoga sur la plage à Puerto Viejo", price: 800, image: "assets/costa-rica/yoga.jpg" },
        { name: "Massage dans la jungle", price: 1200, image: "assets/costa-rica/massage.jpg" },
        { name: "Surf tranquille à Santa Teresa", price: 1000, image: "assets/costa-rica/surf.webp" },
        { name: "Randonnée dans le parc national de Corcovado", price: 900, image: "assets/costa-rica/rando.jpg" }
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
        window.location.href = "../paiement.html";
    });

    updateTotal();
});
