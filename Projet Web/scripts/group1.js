// Initialiser la carte
var map = L.map('map').setView([20, 0], 2);

// Définition des styles de cartes
var tileLayers = {
    "osm": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }),
    "cartoLight": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }),
    "stamenWatercolor": L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
        attribution: '&copy; Stamen Design',
        maxZoom: 16
    })
};

// Ajouter la carte par défaut
tileLayers["osm"].addTo(map);

// Sélecteur de style de carte
document.getElementById('mapStyle').addEventListener('change', function (e) {
    var selectedStyle = e.target.value;
    map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
        }
    });
    tileLayers[selectedStyle].addTo(map);
});

// Liste des destinations
var locations = [
    { name: "Paris", coords: [48.8566, 2.3522], zoom: 5 },
    { name: "États-Unis", coords: [37.0902, -95.7129], zoom: 4 },
    { name: "Tokyo", coords: [35.6895, 139.6917], zoom: 6 }
];

// Ajouter les marqueurs
locations.forEach(loc => {
    var marker = L.marker(loc.coords).addTo(map)
        .bindPopup(`<b>${loc.name}</b><br><button onclick="zoomToLocation(${loc.coords[0]}, ${loc.coords[1]}, ${loc.zoom})">Explorer</button>`);
});

// Fonction pour zoomer sur une destination
window.zoomToLocation = function (lat, lng, zoom) {
    map.flyTo([lat, lng], zoom); // Effet de zoom progressif
    document.getElementById("resetBtn").style.display = "block"; // Afficher le bouton retour
};

// Bouton retour pour revenir à la vue du monde
document.getElementById("resetBtn").addEventListener("click", function () {
    map.flyTo([20, 0], 2); // Retour au zoom initial
    this.style.display = "none"; // Cacher le bouton
});
