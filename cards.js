var suits = ["spades", "diamonds", "clubs", "hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

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

    createDeck(suits, values) {
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
        return this.deck.length;
    }
}

let deck = new Deck();
// deck.createDeck(suits, values);
console.log(deck.createDeck(suits, values));