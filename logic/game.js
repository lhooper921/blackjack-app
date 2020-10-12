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
    createPlayersUI();
    dealHands();
}

function addDeck() {
    deck.createDeck(suits, values);
}

function shuffleDeck() {
    for (let i = 0; i < 7; i++) {
        deck.shuffle();
    }
}

function createPlayers(num) {
    num = 2;
    for(let i = 0; i < num; i++) {
        player = new Player(`${i}`, 0, []);

        players.push(player);
    }
}

function dealHands() {

    for(let j = 0; j < 2; j++) {
        for (let x = 0; x < players.length; x++) {
            let deal = deck.hit();
            players[x].hand.push(deal);
            console.log(players);

            renderCard(deal, j);
            updatePoints();
            updateCardCount();
        } 
    }
    console.log(players)
    // console.log(players[0].hand[0]);
}

function hitMe() {
    currentPlayer = players.length - 1;
    let hit = deck.hit();
    console.log(players)
    console.log(currentPlayer)
    players[currentPlayer].hand.push(hit);
    renderCard(hit, currentPlayer);
    updatePoints();
    updateCardCount();
    check();
}

function stay() {
    if(currentPlayer != 0) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer--;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    } else {
        end();
    }
}

function end() {
    var winner = -1;
    var score = 0;

    for(var i = 0; i < players.length; i++)
    {
        if (players[i].Points > score && players[i].Points < 22)
        {
            winner = i;
        }

        score = players[i].weight;
    }
    console.log(players[winner])
    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].name;
    document.getElementById("status").style.display = "inline-block";
}

function check() {
    if (players[currentPlayer].weight > 21)
    {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].name + ' LOST';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
}

function getPoints(player) {
    var points = 0;
    for(let i = 0; i < players[player].hand.length; i++) {
        points += players[player].hand[i][0].weight;
    }
    players[player].weight = points;
    return points;
}

function updatePoints() {
    for(let i = 0; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].weight
    }
}

// // UI
function renderCard(card, player) {
    console.log(card)
    console.log(card[0].suit)
    let hand = document.getElementById('hand_' + player);
    hand.append(getCardUI(card));
}   

function getCardUI(card) {
    console.log(card);
    let cardEl = document.createElement('div');
    let icon = '';
    if (card[0].suit == 'Hearts')
            icon='&hearts;';
            else if (card[0].suit == 'Spades')
            icon = '&spades;';
            else if (card[0].suit == 'Diamonds')
            icon = '&diams;';
            else
            icon = '&clubs;';

    cardEl.className = 'card';
    cardEl.innerHTML = card[0].value + '<br/>' + icon;
    return cardEl;
}

function createPlayersUI() {
    document.getElementById('players').innerHTML = '';
    for(var i = 0; i < players.length; i++)
    {
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        if(players[i].name == "0") {
            div_playerid.innerHTML = "Dealer";
        } else {
            div_playerid.innerHTML = 'Player ' + players[i].name;
        }
        
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

function updateCardCount() {
    document.getElementById('deckcount').innerHTML = deck.deck.length;
}
 
document.getElementById("hit").addEventListener("click", function() {
    hitMe();
});

document.getElementById("stay").addEventListener("click", function() {
    stay();
});

document.getElementById("btnStart").addEventListener("click", function () {
    startGame();
});

// window.addEventListener('load', function(){
//     addDeck();
//     shuffleDeck();
//     createPlayers(1);
// });

