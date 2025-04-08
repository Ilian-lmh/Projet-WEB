// Sous-destinations associées à chaque destination principale
var subDestinations = {
    "Maroc": [
        { name: "Marrakech", coords: [31.63, -8.00] },
        { name: "Essaouira", coords: [31.51, -9.77] }
    ],
    "Costa Rica": [
        { name: "Arenal", coords: [10.47, -84.65] },
        { name: "Tamarindo", coords: [10.30, -85.84] }
    ],
    "Bali": [
        { name: "Ubud", coords: [-8.5069, 115.2625] },
        { name: "Kuta", coords: [-8.7177, 115.1682] }
    ]
};

var subMarkers = []; // Pour garder une trace des sous-marqueurs
var mainMarkers = []; // Marqueurs principaux pour suppression

// Définir les destinations principales
var locations = [
    { name: "Bali", coords: [-8.4095, 115.1889], zoom: 5 },
    { name: "Maroc", coords: [31.7917, -7.0926], zoom: 5 },
    { name: "Costa Rica", coords: [9.7489, -83.7534], zoom: 5 }
];

// Créer la carte avec taille réduite
var map = L.map('map').setView([20, 0], 2);

// Réduire la taille de la carte
var mapContainer = document.getElementById('map');
mapContainer.style.height = '400px';
mapContainer.style.position = 'relative';

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ajouter les marqueurs pour les destinations principales
locations.forEach(function (location) {
    var marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<b>${location.name}</b><br><button id="exploreBtn" onclick="zoomToLocation(${location.coords[0]}, ${location.coords[1]}, ${location.zoom}, this)">Explorer</button>`);
    mainMarkers.push(marker);
});

// Fonction appelée au clic sur "Explorer"
window.zoomToLocation = function (lat, lng, zoom, buttonEl) {
    map.flyTo([lat, lng], zoom);

    // Cacher le bouton "Explorer" cliqué (optionnel)
    if (buttonEl) {
        buttonEl.style.display = "none";
    }

    // Supprimer tous les marqueurs principaux de la carte
    mainMarkers.forEach(marker => map.removeLayer(marker));

    // Afficher les autres boutons
    document.getElementById("resetBtn").style.display = "block";
    document.getElementById("bookBtn").style.display = "block";

    // Supprimer les anciens sous-marqueurs
    subMarkers.forEach(marker => map.removeLayer(marker));
    subMarkers = [];

    // Trouver le nom de la destination
    const loc = locations.find(loc => loc.coords[0] === lat && loc.coords[1] === lng);
    if (!loc) return;

    const subs = subDestinations[loc.name];
    if (!subs) return;

    // Ajouter les sous-destinations
    subs.forEach(sub => {
        const marker = L.marker(sub.coords).addTo(map)
            .bindPopup(`<b>${sub.name}</b>`);
        subMarkers.push(marker);
    });
};

// Bouton reset
document.getElementById("resetBtn").addEventListener("click", function () {
    map.flyTo([20, 0], 2);
    this.style.display = "none";
    document.getElementById("bookBtn").style.display = "none";
    subMarkers.forEach(m => map.removeLayer(m));
    subMarkers = [];

    // Réafficher tous les boutons "Explorer"
    document.querySelectorAll('.exploreBtn').forEach(btn => {
        btn.style.display = "inline-block";
    });

    // Réafficher les marqueurs principaux
    mainMarkers.forEach(marker => marker.addTo(map));
});
