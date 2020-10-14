$(document).ready(async function () {

    class Player {
        constructor(name, chips, hand) {
            this.name = name;
            this.chips = chips;
            this.hand = hand;
        }
    }

    const DECK_ID = await getDeckID();
    const USER = await getUserData();
    const BLACKJACK = 21;

    var dealer = new Player("DEALER", 0, []);
    var player = new Player(USER.name, USER.chips, []);

    var bet = 0;
    var dealerHandValue = 0;
    var playerHandValue = 0;

    var gamePlate = $("#game-plate");
    var welcomePlate = $("#welcome-plate");

    //renderBettingWindow();


    document.addEventListener('click', async function (event) {
        event.preventDefault();

        let status;

        switch (event.target.id) {
            case 'bet-btn':
                let temp = parseInt($("#bet-amount").val());
                bet = isNaN(temp) ? 0 : temp;
                status = await startHand();
                break;

            case 'stay-btn':
                //After player has stayed, display dealer's second card
                $(".dealer-hand").append((createCardIMG(dealer.hand[1].image)));
                //Dealer hits until 17+ or bust
                status = await dealerHit();
                resolveHand(status);
                break;

            case 'hit-btn':
                //Checks if the player busts
                $("#double-btn").attr('id', 'disabled');
                status = await hit();
                resolveHand(status);
                break;

            case 'double-btn':
                status = await hit();
                bet = bet * 2;
                resolveHand(`${status} DOUBLE`);
                break;

            case 'play-again':
                dealer.hand = [];
                player.hand = [];
                dealerHandValue = 0;
                playerHandValue = 0;
                bet = 0;

                $(".card-display").remove();
                $(".report-display").remove();
                $("#show-chips").text(`You currently have ${player.chips} chips`);

                welcomePlate.show();
                break;

            default:
                break;
        }

    });

    async function resolveHand(status) {

        let handStatus = status.includes('PLAYER BUST') ? 'PLAYER BUST' : status;

        switch (handStatus) {
            case 'PLAYER SAFE':
                break;

            case 'PLAYER SAFE DOUBLE':
                $(".dealer-hand").append((createCardIMG(dealer.hand[1].image)));
                let dealerStatus = await dealerHit();
                resolveHand(dealerStatus);
                break;

            case 'PLAYER BUST':
                //Show dealers second card
                $(".dealer-hand").append((createCardIMG(dealer.hand[1].image)));
                //Gets logical hand values for hand reporting
                playerHandValue = Math.min(...(getHandValues(player.hand)));
                dealerHandValue = Math.max(...(getHandValues(dealer.hand)));
                renderReport("lose");
                break;
            case 'DEALER BUST':
                //Gets logical hand values for hand reporting
                playerHandValue = Math.max(...(getHandValues(player.hand)));
                dealerHandValue = Math.min(...(getHandValues(dealer.hand)));
                renderReport("win!!");
                break;
            case 'DEALER STAY':
                //Gets logical hand values for hand reporting
                playerHandValue = Math.max(...(getHandValues(player.hand).filter((val) => { return val <= 21 })));
                dealerHandValue = Math.max(...(getHandValues(dealer.hand).filter((val) => { return val >= 17 && val <= 21; })));
                if (dealerHandValue == playerHandValue) {
                    renderReport("push...");
                } else {
                    dealerHandValue > playerHandValue ? renderReport("lose") : renderReport("win!!");
                }
                break;
        }
    }

    async function startHand() {

        welcomePlate.hide();

        dealer.hand = await draw(2);
        player.hand = await draw(2);

        let handValues = getHandValues(player.hand);
        let status = handValues.includes(21) ? "BLACKJACK" : "PLAYER SAFE";

        renderHands();

        return status;
    }

    async function dealerHit() {

        let handValues = getHandValues(dealer.hand);

        //if none of the possible hand values for the dealer are less than 21, then the dealer busts
        if (Math.min(...handValues) > 21) {
            return "DEALER BUST";
        }

        //If the dealer didnt bust, create an array of values that meets the dealer stay condition
        let stayAmounts = handValues.filter((value) => { return value >= 17 && value <= 21 });

        if (stayAmounts.length > 0) {
            return "DEALER STAY";
        }

        //If the dealer didnt bust and none of the possible handvalues fufilled the stay condition, then the dealer hits
        var card = await draw(1);
        dealer.hand.push(card[0]);

        //Render new card
        $(".dealer-hand").append(createCardIMG(dealer.hand[dealer.hand.length - 1].image));

        return dealerHit();
    }

    async function hit() {

        var card = await draw(1);
        player.hand.push(card[0]);

        $(".player-hand").append(createCardIMG(player.hand[player.hand.length - 1].image));

        let handValues = getHandValues(player.hand);
        let safeAmounts = handValues.filter((value) => { return value <= 21 });

        let status = safeAmounts.length == 0 ? "PLAYER BUST" : "PLAYER SAFE";
        playerHandValue = Math.max(...safeAmounts);

        return status;
    }

    //Returns all possible hand values (NOTE: An ace can be equal to 11 or 1)
    function getHandValues(hand) {

        let aceCount = 0;
        let maxHandTotal = hand.reduce((total, card) => {

            let val = parseInt(card.value);
            let pVal = !isNaN(val) ? val :
                card.value === "ACE" ? 11 : 10;

            if (pVal == 11) aceCount++;

            return total + pVal;
        }, 0);

        let handValues = [maxHandTotal];

        while (aceCount > 0) {
            handValues.push(maxHandTotal - aceCount * 10);
            aceCount--;
        }

        return handValues;
    }

    async function renderBettingWindow() {

        var bettingWindow = $("<div></div>").addClass("bg-light rounded m-1 p-3 betting-window");
        var welcomeUser = $("<h2></h2>").addClass("m-1 text-center").text(`Welcome ${player.name}!`);
        var chipCount = $("<h4></h4>").addClass("m-1").text(`You have ${player.chips} chips`);
        var placeBet = $("<h3></h3>").addClass("m-1 text-center").text("Place your bet");
        var betInput = $("<input></input>").addClass("form-control").attr('id', 'bet-amount');
        var betBtn = $("<button></button>").addClass("btn btn-primary btn-block").attr('id', 'bet-btn');

        
        bettingWindow.append(welcomeUser);
        bettingWindow.append(chipCount);
        bettingWindow.append(placeBet);
        bettingWindow.append(betInput);
        bettingWindow.append(betBtn);
        gamePlate.append(bettingWindow);
    }

    async function renderHands() {

        welcomePlate.hide();

        //Contains dealer and player cards
        var mainCol = $("<div></div>").addClass("col-md-8 card-display");
        var reportCol = $("<div></div>").addClass("col-md-4 report-display p-3");

        var handReport = $("<div></div>").addClass("bg-light rounded m-1 p-3 player-action");
        var stayBtn = $("<div></div>").addClass("btn btn-primary btn-block  p-3 stay-btn").text("Stay").attr('id', "stay-btn");
        var hitBtn = $("<div></div>").addClass("btn btn-warning btn-block  p-3 hit-btn").text("Hit").attr('id', "hit-btn");
        var doubleBtn = $("<div></div>").addClass("btn btn-danger btn-block p-3 double-btn").text("Double").attr('id', "double-btn");

        handReport.append(stayBtn);
        handReport.append(hitBtn);
        handReport.append(doubleBtn);
        reportCol.append(handReport);

        var dealerRow = $("<div></div>").addClass("row dealer-hand p-1");
        var dealerHeader = $("<h3></h3>").text("Dealer").addClass("text-white");

        dealerRow.append(createCardIMG(dealer.hand[0].image));
        mainCol.append(dealerHeader);
        mainCol.append(dealerRow);

        var playerRow = $("<div></div>").addClass("row player-hand p-1");
        var playerHeader = $("<h3></h3>").text("Player").addClass("text-white");
        playerRow.append(createCardIMG(player.hand[0].image));
        playerRow.append(createCardIMG(player.hand[1].image));
        mainCol.append(playerHeader);
        mainCol.append(playerRow);

        gamePlate.append(mainCol);
        gamePlate.append(reportCol);

    }

    function renderReport(result) {

        let payout = 0;

        //Checks for Blackjack and adjusts payout to 3:2
        if (result == "win!!") {
            if (playerHandValue == BLACKJACK && player.hand.length == 2) {
                payout = Math.ceil(1.5 * bet);
            } else {
                payout = bet;
            }
        }

        else if (result == "lose") {
            payout -= bet;
        }


        player.chips += payout;
        updateUser({ chips: player.chips, id: USER.id });

        $(".player-action").hide();

        var reportCol = $(".report-display");

        var handReport = $("<div></div>").addClass("bg-light rounded m-1 p-3");
        var winStatus = $("<h2></h2>").addClass("m-1 text-center").text(`You ${result}`);
        var betView = $("<h4></h4>").addClass("m-1").text(`Bet: ${bet}`);
        var payoutView = $("<h4></h4>").addClass("m-1").text(`Payout: ${payout}`);
        var playerValue = $("<h4></h4>").addClass("m-1").text(`Your hand: ${playerHandValue}`);
        var dealerValue = $("<h4></h4>").addClass("m-1").text(`Dealer's hand: ${dealerHandValue}`);
        var chipCount = $("<h4></h4>").addClass("m-1").text(`You now have ${player.chips} chips`);

        handReport.append(winStatus);
        handReport.append(betView);
        handReport.append(payoutView);
        handReport.append(playerValue);
        handReport.append(dealerValue);
        handReport.append(chipCount);

        var playAgainCard = $("<div></div>").addClass("bg-light rounded mt-3 p-3");
        var playAgain = $("<h2></h2>").addClass("m-3 text-center").text("Play again?");
        var playAgainbtn = $("<button></button>").addClass("btn btn-primary btn-block p-3").text("Play Again").attr("id", "play-again");

        playAgainCard.append(playAgain);
        playAgainCard.append(playAgainbtn);

        reportCol.append(handReport);
        reportCol.append(playAgainCard);
    }

    function createCardIMG(src) {

        let img = $("<img>").attr('src', src).addClass("m-1");
        return img;
    }

    async function getDeckID() {

        let res = await $.ajax({
            url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6",
            method: "GET"
        });
        return res.deck_id;
    }

    async function draw(amount) {

        let res = await $.ajax({
            url: `https://deckofcardsapi.com/api/deck/${DECK_ID}/draw/?count=${amount}`,
            method: "GET"
        });
        return res.cards;
    }

    async function getUserData() {

        let res = await $.get("api/user_data");
        return res;
    }

    async function updateUser(data) {
        $.ajax({
            method: "PUT",
            url: "api/user_data",
            data: data
        });
    }
});