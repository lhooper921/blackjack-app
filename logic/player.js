const Deck = require("./deck.js");

class Player {
    constructor(name, chips, hand, weight) {
        this.name = name;
        this.chips = chips;
        this.hand = hand;
        this.weight = weight;
    }
}

// let player = new Player;
module.exports = Player;