// Initialiser la carte centrée sur le monde
var map = L.map('map').setView([20, 0], 2);

// Définition des styles de cartes
var tileLayers = {
    "osm": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }),
    "cartoLight": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
    }),
    "thunderforest": L.tileLayer('https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=f2227bae3c12495787960bc8ea578f22', {
        attribution: '&copy; Thunderforest'
    })



};


// Ajouter la carte par défaut (OSM)
tileLayers["osm"].addTo(map);

// Changer la carte quand l'utilisateur sélectionne un style
document.getElementById('mapStyle').addEventListener('change', function (e) {
    var selectedStyle = e.target.value;

    // Supprime toutes les couches actuelles sauf les marqueurs
    map.eachLayer(layer => {
        if (layer instanceof L.TileLayer) {
            map.removeLayer(layer);
        }
    });

    // Ajouter la nouvelle carte sélectionnée
    tileLayers[selectedStyle].addTo(map);
});

// Ajouter des marqueurs cliquables
var locations = [
    { name: "Paris", coords: [48.8566, 2.3522], url: "paris.html" },
    { name: "New York", coords: [40.7128, -74.0060], url: "newyork.html" },
    { name: "Tokyo", coords: [35.6895, 139.6917], url: "tokyo.html" }
];

locations.forEach(loc => {
    L.marker(loc.coords).addTo(map)
        .bindPopup(`<b>${loc.name}</b><br><a href="${loc.url}">Découvrir</a>`);
});
