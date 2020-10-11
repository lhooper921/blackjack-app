const Deck = require("./deck");
const Player = require("./player");
var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// let hand = [];
let deck = new Deck;
let players = new Array();
let player = new Player;

function startGame() {
    addDeck();
    shuffleDeck();
    createPlayers();
    dealHands();
}

function addDeck() {
    deck.createDeck(suits, values);
    deck.createDeck(suits, values);
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < 7; i++) {
        deck.shuffle();
    }
}

function createPlayers(num) {
    num = 2;
    for(let i = 1; i <= num; i++) {
        player = new Player(`player${i}`, 0, []);
        players.push(player);
    }
    console.log(players);
}

function dealHands() {
    console.log(deck);
    for (let x = 0; x < players.length; x++) {
        players[x].hand.push(deck.deal());
        console.log(players[x].hand);
        renderCard();
    }
    console.log("Hand")
    console.log(players[0].hand);
    console.log(players[1].hand);
}

function renderCard() {
    // var playerHand = document.getElementById('hand_' + player);
    let playerHand = [];
    playerHand.appendChild(getCardUI());
    console.log(playerHand)
}

function getCardUI() {
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = players.hand.suit + '' + player.hand.value;
    console.log("Players hand : " + players.hand.suit + '' + player.hand.value);
}

// AWAITING FOR LAUREN'S HTML
function createPlayerUI() {
    document.getElementById('players').innerHTML = '';
    for(let i = 0; i < players.length; i++) {
        
    }
}

startGame();
 
// document.getElementById("hit-btn").addEventListener("click", function() {
    
// });
// document.getElementById("stay-btn")

// document.getElementById("play-btn").addEventListener("click", function () {
//     startGame();
// });