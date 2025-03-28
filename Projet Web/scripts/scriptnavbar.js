$(document).ready(function () {
    // Emp�che la fermeture du menu lors d'un clic sur le bouton de bascule
    $('.navbar-toggler').on('click', function (event) {
        event.stopPropagation();
        $('.navbar-collapse').collapse('toggle');
    });

    // Emp�che la fermeture du menu lors d'un clic � l'int�rieur de celui-ci
    $('.navbar-collapse').on('click', function (event) {
        event.stopPropagation();
    });

    // Ferme le menu si un clic est d�tect� en dehors de la barre de navigation
    $(document).on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
});
