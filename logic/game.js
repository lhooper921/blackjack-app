// Requires Deck and Player objects
// const Deck = require("./deck");
// const Player = require("./player");

// Suits and Values for cards in a Deck


class Card {
    constructor(suit, value, weight) {
        this.suit = suit;
        this.value = value;
        this.weight = weight;
    }
}

class Deck {
    constructor() {
        this.deck = [];
    }

    createDeck() {
        for (let suit of suits) {
            for (let value of values) {
                var weight = parseInt(value);
                if (value == "J" || value == "Q" || value == "K")
                    weight = 10;
                if (value == "A")
                    weight = 11;
                this.deck.push(new Card(suit, value, weight));
            }
        }
        return this.deck.length;
    }
    shuffle() {
        let counter = this.deck.length, temp, i;
        while(counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }
    
    deal() {
        let hand = [];
        while (hand.length < 2) {
            hand.push(this.deck.pop());
        }
        return hand;
    }

    hit() {
        let hand = [];
        hand.push(this.deck.pop());
        // console.log(hand);
        return hand;
    }
}

class Player {
    constructor(name, chips, hand, weight) {
        this.name = name;
        this.chips = chips;
        this.hand = hand;
        this.weight = weight;
    }
}

var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// Global Variables
let deck = new Deck;
let players = new Array();
let player = new Player;
let currentPlayer = 0;

function startGame() {
    addDeck();
    shuffleDeck();
    createPlayers();
    // createPlayersUI();
    dealHands();
}

function addDeck() {
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
        let deal = deck.deal();
        players[x].hand.push(deal);
        // console.log(players[x].hand);
        // renderCard(deal, x);

        // let handWeight = players[currentPlayer].weight;
        // for(let i = 0; i < players[x].hand.length; i++) {
        //     handWeight += players[currentPlayer].hand.Card.weight;
        //     console.log(handWeight)
        // }
    }
    console.log("Hand")
    console.log(players[0].hand[0][1]);
    console.log(players[1].hand);
    hitMe();
}

function hitMe() {
    let hit = deck.hit();
    players[currentPlayer].hand.push(hit);
    renderCard(hit, currentPlayer);
    check();
}

// function check() {
//     let handWeight = players[currentPlayer].weight;
// }

// // UI
function renderCard(card, player) {
    let hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
    console.log(card)
    console.log(card.Suit)
}

function getCardUI(card) {
    let cardEl = document.createElement('div');
    let icon = '';
    if (card.Suit == 'Hearts')
            icon='&hearts;';
            else if (card.Suit == 'Spades')
            icon = '&spades;';
            else if (card.Suit == 'Diamonds')
            icon = '&diams;';
            else
            icon = '&clubs;';
}

// function createPlayerUI() {
// }

startGame();
 
// document.getElementById("hit-btn").addEventListener("click", function() {
    
// });
// document.getElementById("stay-btn")

// document.getElementById("play-btn").addEventListener("click", function () {
//     startGame();
// });