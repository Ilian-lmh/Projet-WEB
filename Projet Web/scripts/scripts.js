const countries = ["France", "Allemagne", "Espagne", "Italie", "Canada", "Brésil", "Japon", "Chine", "Russie", "Australie"];

// File: scripts/script.js
// Main game logic

function checkAnswer() {
    const input = document.getElementById("country-input").value.trim();
    if (countries.includes(input)) {
        alert("Bonne réponse!");
    } else {
        alert("Mauvaise réponse.");
    }
}
