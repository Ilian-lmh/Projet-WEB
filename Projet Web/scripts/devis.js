document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("devis-form");
    const confirmation = document.getElementById("confirmation-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Emp�che l'envoi r�el

        // Option 1 : remplacer le contenu complet
        // document.querySelector(".devis-container").innerHTML = `
        //     
        // `;

        // Option 2 : juste afficher un message en dessous
        confirmation.innerHTML = `
            <p>Merci nous reviendrons rapidement vers vous avec des idees pour un EVG de folie.</p>
            <a href="index.html" class="btn btn-primary mt-3">Retour a l'accueil</a>
        `;

        form.reset(); // R�initialise les champs du formulaire
    });
});
