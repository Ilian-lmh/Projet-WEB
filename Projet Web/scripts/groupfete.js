const reservationLinks = {
    "Ibiza": "../Projet Web/ville/ibiza.html",
    "Paris": "../Projet Web/ville/paris.html",
    "Rio de Janeiro": "../Projet Web/ville/rio.html",
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
        { name: "📍 Pacha Ibiza, Marina Botafoch", coords: [38.9171, 1.4459] },
        { name: "Croisière privée avec open bar📍 Départ souvent depuis Marina Ibiza", coords: [38.9098, 1.4429] },
        { name: "📍 Cala Bassa Beach Club (CBbC)", coords: [38.9630, 1.2368] },
        { name: "Pool party au Ushuaïa", coords: [38.8814, 1.4052] },
        { name: "Excursion en jetski autour de l'île📍 Point de départ souvent à San Antonio", coords: [38.9805, 1.3006] },
        { name: "Spa détente face à la mer Hacienda Na Xamena", coords: [39.0873, 1.3097] }
    ],
    "Rio de Janeiro": [
        { name: "Tour en hélicoptère autour du Christ Rédempteur📍 Helipad de Lagoa ou Sugarloaf Heliport", coords: [-22.9646, -43.2178] },
        { name: "Soirée VIP au Copacabana Palace📍 Copacabana Palace", coords: [-22.9666, -43.1791] },
        { name: "Cours de samba privé avec des pros📍 Ginga Tropical", coords: [-22.9126, -43.1780] },
        { name: "Excursion en yacht autour des îles📍 Marina da Glória", coords: [-22.9192, -43.1686] },
        { name: "Session de surf avec moniteur à Ipanema📍 Plage d’Ipanema ", coords: [-22.9836, -43.2066] },
        { name: "BBQ brésilien au bord de la plage📍 Barra da Tijuca", coords: [-23.0036, -43.3653] }
    ]
};

var subMarkers = []; // Pour garder une trace des sous-marqueurs
var mainMarkers = []; // Marqueurs principaux pour suppression

// Définir les destinations principales
var locations = [
    { name: "Ibiza", coords: [38.9089, 1.4320], zoom: 10 },
    { name: "Paris", coords: [48.8566, 2.3522], zoom: 12 },
    { name: "Rio de Janeiro", coords: [-22.9068, -43.1729], zoom: 9 }
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

