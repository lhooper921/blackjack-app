const Deck = require("./deck.js");
const Card = require("./card.js");

class Player {
    constructor(name, chips, hand) {
        this.name = name;
        this.chips = chips;
        this.hand = hand;
    }
}

// let player = new Player;
module.exports = Player;