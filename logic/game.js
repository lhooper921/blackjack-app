const Deck = require("./deck");
const Player = require("./player");

function startGame() {
    let deck = new Deck();
    deck.createDeck(suits, values);
    for (let i = 0; i < 7; i++) {
        deck.shuffle();
    }
}

document.getElementById("hit-btn").addEventListener("click", function() {
    
});
document.getElementById("stay-btn")

document.getElementById("play-btn").addEventListener("click", function () {
    startGame();
});