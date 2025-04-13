const reservationLinks = {
    "Ibiza": "ibiza.html",
    "Paris": "paris.html",
    "Rio de Janeiro": "rio.html",
    "Moab": "moab.html",
    "Cap Town": "cap.html",
    "Intarlaken": "intarlaken.html",
    "Bali": "bali.html",
    "Maroc": "maroc.html",
    "Costa Rica": "costa.html",
}

// Sous-destinations associées à chaque destination principale
var subDestinations = {
    "Paris": [
        { name: "Balade en Limousine", coords: [48.8656, 2.3212] },
        { name: "Loge au Parc Des Princes", coords: [48.8414, 2.2530] },
        { name: "Entrée VIP à l’Arc", coords: [48.8738, 2.2950] },
        { name: "Dîner gastronomique", coords: [48.8650, 2.3287] },
        { name: "Bateau mouche privatisé", coords: [48.8642, 2.3030] },
        { name: "Séance SPA de luxe ", coords: [48.8669, 2.3056] }
    ],
    "Ibiza": [
        { name: "Arenal", coords: [10.47, -84.65] },
        { name: "Tamarindo", coords: [10.30, -85.84] }
    ],
    "Rio de Janeiro": [
        { name: "Ubud", coords: [-8.5069, 115.2625] },
        { name: "Kuta", coords: [-8.7177, 115.1682] }
    ],
    "Moab": [
        { name: "Marrakech", coords: [31.63, -8.00] },
        { name: "Essaouira", coords: [31.51, -9.77] }
    ],
    "Cap Town": [
        { name: "Arenal", coords: [10.47, -84.65] },
        { name: "Tamarindo", coords: [10.30, -85.84] }
    ],
    "Intarlaken": [
        { name: "Ubud", coords: [-8.5069, 115.2625] },
        { name: "Kuta", coords: [-8.7177, 115.1682] }
    ],
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
    { name: "Ibiza", coords: [38.9089, 1.4320], zoom: 9 },
    { name: "Paris", coords: [48.8566, 2.3522], zoom: 12 },
    { name: "Rio de Janeiro", coords: [-22.9068, -43.1729], zoom: 9 },
    { name: "Moab", coords: [38.5733, -109.5498], zoom: 9 },
    { name: "Cap town", coords: [-33.9249, 18.4241], zoom: 9 },
    { name: "Intarlaken", coords: [46.6863, 7.8632], zoom: 9 },
    { name: "Bali", coords: [-8.4095, 115.1889], zoom: 5 },
    { name: "Maroc", coords: [31.7917, -7.0926], zoom: 5 },
    { name: "Costa Rica", coords: [9.7489, -83.7534], zoom: 5 }

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
    "cartoLight": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href=\"https://carto.com/attributions\">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }),
    "osm": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
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
    const target = document.querySelector(".map-style-selector2"); // ou .map-wrapper
    const yOffset = 0; // ⬅️ remonte de 100px au-dessus de l'élément
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
});
