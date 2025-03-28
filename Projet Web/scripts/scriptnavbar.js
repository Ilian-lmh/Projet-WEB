$(document).ready(function () {
    // Empêche la fermeture du menu lors d'un clic sur le bouton de bascule
    $('.navbar-toggler').on('click', function (event) {
        event.stopPropagation();
        $('.navbar-collapse').collapse('toggle');
    });

    // Empêche la fermeture du menu lors d'un clic à l'intérieur de celui-ci
    $('.navbar-collapse').on('click', function (event) {
        event.stopPropagation();
    });

    // Ferme le menu si un clic est détecté en dehors de la barre de navigation
    $(document).on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
});
