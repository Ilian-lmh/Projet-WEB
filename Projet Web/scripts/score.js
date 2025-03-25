let score = 0;
let timeLeft = 60;

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById("timer-display").innerText = `Temps restant: ${timeLeft}s`;
    } else {
        alert("Temps écoulé! Votre score est: " + score);
    }
}
setInterval(updateTimer, 1000);
