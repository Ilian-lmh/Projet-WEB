document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("devis-form");
    const confirmation = document.getElementById("confirmation-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Empêche l'envoi réel

        // Option 1 : remplacer le contenu complet
        // document.querySelector(".devis-container").innerHTML = `
        //     
        // `;

        // Option 2 : juste afficher un message en dessous
        confirmation.innerHTML = `
            <p>Merci nous reviendrons rapidement vers vous avec des idees pour un EVG de folie.</p>
            <a href="index.html" class="btn btn-primary mt-3">Retour a l'accueil</a>
        `;

        form.reset(); // Réinitialise les champs du formulaire
    });
});
