const Deck = require("./deck");
const Player = require("./player");
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let hand = [];
let deck = new Deck;


function startGame() {
    deck.createDeck(suits, values);
    // console.log(deck.createDeck(suits, values))
    shuffleDeck();
    // console.log(deck);
    createPlayers();
    dealHands();
}

function shuffleDeck() {
    for (let i = 0; i < 7; i++) {
        deck.shuffle();
    }
}

function createPlayers(num) {
    players = new Array();
    num = 2;
    for(let i = 1; i <= num; i++) {
        var player = new Player;

        player.name = "Player " + i;
        player.chips;

        // var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
    console.log(players)
    // dealHands();
}

function dealHands() {
    console.log(deck);
    // for(let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            players[x].hand.push(deck.deal());
            console.log(players[x].hand);
            // deck.shuffle();
        }
        console.log("Hand: " + players[0].Hand);
    // }
}

function renderCard(card, player) {

}

// AWAITING FOR LAUREN'S HTML
// function createPlayerUI() {

// }

startGame();

// document.getElementById("hit-btn").addEventListener("click", function() {
    
// });
// document.getElementById("stay-btn")

// document.getElementById("play-btn").addEventListener("click", function () {
//     startGame();
// });