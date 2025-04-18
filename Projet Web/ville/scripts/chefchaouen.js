document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Bain traditionnel au hammam", price: 800, image: "assets/chefchaouen/hammam.jpg" },
        { name: "Thé à la menthe sur les toits", price: 150, image: "assets/chefchaouen/tea.webp" },
        { name: "Visite guidée de la vieille ville", price: 400, image: "assets/chefchaouen/medina.jpg" },
        { name: "Séance de yoga en montagne", price: 600, image: "assets/chefchaouen/yoga-mountain.jpg" },
        { name: "Balade à Akchour", price: 500, image: "assets/chefchaouen/akchour.jpg" }
    ];

    const container = document.getElementById("activities-container");
    const totalPriceEl = document.getElementById("total-price");
    const payerButton = document.getElementById("payer-button");

    let total = 0;

    function updateTotal() {
        const checkboxes = document.querySelectorAll(".activity-checkbox:checked");
        total = Array.from(checkboxes).reduce((sum, box) => sum + parseInt(box.dataset.price), 0);
        totalPriceEl.textContent = `${total}€`;
        payerButton.style.display = total > 0 ? "inline-block" : "none";
    }

    activities.forEach((activity, index) => {
        const div = document.createElement("div");
        div.classList.add("activity-item");

        const left = document.createElement("div");
        left.classList.add("activity-left");

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

        left.appendChild(checkbox);
        left.appendChild(image);
        left.appendChild(label);

        const button = document.createElement("button");
        button.textContent = "Ajouter";
        button.classList.add("activity-button");
        button.addEventListener("click", () => {
            checkbox.checked = !checkbox.checked;
            button.textContent = checkbox.checked ? "Supprimer" : "Ajouter";
            updateTotal();
        });

        div.appendChild(left);
        div.appendChild(button);
        container.appendChild(div);
    });

    payerButton.addEventListener("click", () => {
        window.location.href = "paiement.html";
    });

    updateTotal();
});