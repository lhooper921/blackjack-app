var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let hand = [];

class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

let card = new Card("hearts", "Q");

class Deck {
    constructor() {
        this.deck = [];
    }

    createDeck() {
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
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
        while(hand.length < 2) {
            hand.push(this.deck.pop());
        }
        return hand;

    }

    hit() {
        hand.push(this.deck.pop());
        // console.log(hand);
        return hand;
    }
}


let deck = new Deck();
let deck = new Deck();

// Perhaps link this to a 
function addDeck(){
    
}

// deck.createDeck(suits, values);

console.log(deck.createDeck(suits, values));
// // deck.createDeck(suits, values);

// // console.log(deck);
// // console.log(deck.hit);
console.log(deck.createDeck(suits, values));
console.log(deck.shuffle());
console.log(deck.deal());
console.log(deck.hit());

module.exports = Deck;