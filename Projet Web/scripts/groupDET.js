const reservationLinks = {
    "Bali": "bali.html",
    "Maroc": "maroc.html",
    "Costa Rica": "costa.html",
}

// Sous-destinations associées à chaque destination principale
var subDestinations = {
    "Chefchaouen": [
            {name: "Bain traditionnel au hammam",
            coords: [35.1685, -5.2641] },
            { name: "Thé à la menthe sur les toits",
                coords: [35.1691, -5.2638]},
            { name: "Visite guidée de la vieille ville",
                coords: [35.1687, -5.2634]  },
            {name: "Séance de yoga en montagne",
                coords: [35.1727, -5.2732]  },
            {name: "Balade à Akchour",
                coords: [35.2502, -5.2255]}
        ],

    "Costa Rica": [
        { name: "Sources chaudes naturelles à La Fortuna", coords: [10.4700, -84.6450] },
        { name: "Cours de yoga sur la plage à Puerto Viejo", coords: [9.6550, -82.7541] },
        { name: "Massage dans la jungle", coords: [10.3026, -84.7950] },
        { name: "Surf tranquille à Santa Teresa", coords: [9.6563, -85.1603] },
        { name: "Randonnée dans le parc national de Corcovado", coords: [8.5464, -83.5912] }
    ],

    "Bali": [
        { name: "Massage balinais traditionnel", coords: [-8.5074, 115.2605] },
        { name: "Cours de yoga au lever du soleil", coords: [-8.5062, 115.2627] },
        { name: "Session de méditation guidée à Ubud", coords: [-8.5195, 115.2622] },
        { name: "Découverte des rizières en vélo", coords: [-8.4317, 115.2799] },
        { name: "Bain floral dans une villa spa", coords: [-8.5052, 115.2650] }
    ]
};

var subMarkers = []; // Pour garder une trace des sous-marqueurs
var mainMarkers = []; // Marqueurs principaux pour suppression

// Définir les destinations principales
var locations = [
    { name: "Bali", coords: [-8.4095, 115.1889], zoom: 11 },
    { name: "Chefchaouen", coords: [35.1688, -5.2636], zoom: 13 },
    { name: "Costa Rica", coords: [9.7489, -83.7534], zoom: 8 }
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