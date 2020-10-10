var suits = ["Spades", "Diamonds", "Clubs", "Hearts"];
var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

class Card {
    constructor(suit, value, weight) {
        this.suit = suit;
        this.value = value;
        this.weight = weight;
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
        hand.push(this.deck.pop());
        // console.log(hand);
        return hand;
    }
}

// let deck = new Deck();
// deck.createDeck(suits, values);
// deck.shuffle();
// console.log(deck.createDeck(suits, values));

// console.log(deck.createDeck(suits, values));
// console.log(deck.shuffle());
// console.log(deck.deal());
// console.log(deck.deal());
// console.log(deck.hit());

module.exports = Deck;