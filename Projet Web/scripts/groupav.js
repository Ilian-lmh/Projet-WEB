const reservationLinks = {
    "Moab": "../Projet Web/ville/moab.html",
    "Cap town": "../Projet Web/ville/capetown.html",
    "Interlaken": "../Projet Web/ville/interlaken.html",
}

// Sous-destinations associées à chaque destination principale
var subDestinations = {
    "Moab": [
        { name: "Tour en buggy dans le désert 📍 Sand Flats Recreation Area", coords: [38.5662, -109.4906] },
        { name: "Escalade des canyons📍 Indian Creek", coords: [38.0164, -109.5632] },
        { name: "Saut en parachute📍 Skydive Moab", coords: [38.7556, -109.7546] },
        { name: "Rando VTT sur Slickrock📍 Slickrock Bike Trail", coords: [38.5739, -109.5126] },
        { name: "Kayak sur le Colorado📍 Colorado River près de Moab", coords: [38.5828, -109.5512] }
    ],
    "Cap town": [
        { name: "Skydive Cape Town", coords: [-33.5566, 18.4893] },
        { name: "Gansbaai", coords: [-34.5800, 19.3500] },
        { name: "Randonnée Table Mountain", coords: [-33.9561, 18.4037] },
        { name: " Muizenberg Beach", coords: [-34.1067, 18.4696] },
        { name: "Cape Canopy Tour", coords: [-34.0872, 19.0257] }
    ],
    "Interlaken": [
        { name: "Paragliding Interlaken", coords: [46.6886, 7.8496] },
        { name: "Stockhorn Bungee", coords: [46.7167, 7.5670] },
        { name: "Hintere Lauterbrunnen vallée", coords: [46.5380, 7.9094] },
        { name: "Via Ferrata Mürren", coords: [46.5586, 7.8923] },
        { name: "Lütschine River", coords: [46.6667, 7.8500] }
    ]
};

var subMarkers = []; // Pour garder une trace des sous-marqueurs
var mainMarkers = []; // Marqueurs principaux pour suppression

// Définir les destinations principales
var locations = [
    { name: "Moab", coords: [38.5733, -109.5498], zoom: 9 },
    { name: "Cap town", coords: [-33.9249, 18.4241], zoom: 8 },
    { name: "Interlaken", coords: [46.6863, 7.8632], zoom: 9 }
];

// Créer la carte avec taille réduite
var map = L.map('map').setView([20, 0], 2);

// Réduire la taille de la carte
var mapContainer = document.getElementById('map');
mapContainer.style.position = 'relative';

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Définir les tuiles disponibles
var tileLayers = {
    "osm": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }),
    "cartoLight": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href=\"https://carto.com/attributions\">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }),
    "thunderforest": L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=f2227bae3c12495787960bc8ea578f22', {
        attribution: '© Thunderforest, © OpenStreetMap contributors',
        maxZoom: 22
    })
};

// Ajouter la carte par défaut
tileLayers["cartoLight"].addTo(map);

// Gestion du changement de style via le select
document.getElementById("mapStyle").addEventListener("change", function (e) {
    const selectedStyle = e.target.value;

    // Supprimer tous les layers existants
    Object.values(tileLayers).forEach(layer => {
        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
        }
    });

    // Ajouter le nouveau layer sélectionné
    tileLayers[selectedStyle].addTo(map);
});

// Ajouter les marqueurs pour les destinations principales
locations.forEach(function (location) {
    var marker = L.marker(location.coords).addTo(map);
    marker.bindPopup(`<button class="exploreBtn" onclick="zoomToLocation(${location.coords[0]}, ${location.coords[1]}, ${location.zoom}, this)">${location.name}</button>`);
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
    document.getElementById("map-buttons").style.display = "block";
    const bookBtn = document.getElementById("bookBtn");
    bookBtn.style.display = "inline-block";

    // Récupérer la destination
    const loc = locations.find(loc => loc.coords[0] === lat && loc.coords[1] === lng);
    if (loc && reservationLinks[loc.name]) {
        bookBtn.onclick = () => {
            window.location.href = reservationLinks[loc.name];
        };
    } else {
        bookBtn.onclick = null;
    }

    document.getElementById("resetBtn").style.display = "inline-block";

    // Supprimer les anciens sous-marqueurs
    subMarkers.forEach(marker => map.removeLayer(marker));
    subMarkers = [];

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
    document.getElementById("map-buttons").style.display = "none";
    subMarkers.forEach(m => map.removeLayer(m));
    subMarkers = [];

    // Réafficher tous les boutons "Explorer"
    document.querySelectorAll('.exploreBtn').forEach(btn => {
        btn.style.display = "inline-block";
    });

    // Réafficher les marqueurs principaux
    mainMarkers.forEach(marker => marker.addTo(map));
});
// Scroll fluide vers la map
document.getElementById("scrollToMap").addEventListener("click", function () {
    document.getElementById("maps").scrollIntoView({ behavior: "smooth", block: "start" });
});
