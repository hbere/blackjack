// TODO - add support for splitting hand
// TODO - add better scoring for Aces
// TODO - add additional computer characters
// TODO - let the user pick the number of decks used
// TODO - add betting
// TODO - add "Blackjack" exclamation if a blackjack
// TODO - add record of wins & losses
// TODO - add "You went bust" and auto-complete game if user hits to get 22 or more points

// Variables
const suits = ["-S", "-C", "-D", "-H"];
const faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const scoresA1 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1]
// const scoresA11 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
let deck = [];
let status = 1; // game status. 1=ongoing. 0=over.
let player;
let house;
let scoreboard = [0,0,0]; // wins | pushes | losses

// Objects
function Player() {
    this.cards = [];
    this.scores = [];
    this.draw = function () {
        let tempArray = pickupTopCard();
        let message = document.getElementById("playerHand");
        message.innerHTML = "";
        // console.log(tempArray);
        // add card & register score
        try {
            this.cards.push(tempArray[0]);
            this.scores.push(tempArray[1]);
        }
        catch(err) {
            message.innerHTML = "Error: No more cards left in deck. Start Over.";
        }
    };
    this.hit = function () {
        // alias for draw
        this.draw();
    };
    this.show = function () {
        return [...this.cards];
    };
    this.show1 = function () {
        return this.cards[0];
    };
    this.stand = function () {
        // do not add a card & end the game
    };
    this.score = function () {
        return arraySum(this.scores);
    };
    this.score1 = function () {
        return this.scores[0];
    };
    this.hitWhileLessThan17 = function () {
        let myScore = 0;
        myScore = arraySum(this.scores);
        if (myScore < 17) {
            do {
                this.draw();
                myScore = arraySum(this.scores);
            } while (myScore < 17);
        }
    }
}

// Event Listeners
window.onload = function () {
    start();
};

$('#hit').click(function () {
    hit();
});

$('#stand').click(function () {
    stand();
});

$('#newGame').click(function () {
    start();
});

// Functions
function start() {
    player = new Player();
    house = new Player();
    // generate deck; e.g., shuffle(1) means using 1 deck of 52 cards,
    // shuffle(2) means using 2 decks of 52 cards, etc.
    shuffle(1);
    // console.log(...deck);
    // deal the cards
    player.draw();
    house.draw();
    player.draw();
    house.draw();
    // console.log cards
    console.log('***New Game***');
    console.log(`Player cards: ${player.show()}.
    Score: ${player.score()}.`);
    // display cards
    $("#houseHand").empty();
    $("#houseHand").text(`Cards: ${house.show1()}.`);
    $("#houseHand").append(`<br>Score: ${house.score1()}.`);
    $("#playerHand").empty();
    $("#playerHand").text(`Cards: ${player.show()}.`);
    $("#playerHand").append(`<br>Score: ${player.score()}.`);
    $("#result").empty();
}

function stand() {
    let result = [];
    // Make sure house hits until they have 17 or more points
    house.hitWhileLessThan17();
    // console.log cards
    console.log(`House cards: ${house.show()}.
    Score: ${house.score()}.`);
    // display cards
    $("#playerHand").empty();
    $("#playerHand").text(`Cards: ${player.show()}.`);
    $("#playerHand").append(`<br>Score: ${player.score()}.`)
    $("#houseHand").empty();
    $("#houseHand").text(`Cards: ${house.show()}.`);
    $("#houseHand").append(`<br>Score: ${house.score()}.`);
    // calculate result
    result = scoreGame(player.score(), house.score());
    // display result & scoreboard
    $("#result").text(result[3]);
    scoreboard[0] += result[0];
    scoreboard[1] += result[1];
    scoreboard[2] += result[2];
    $("#scoreboard").text([...scoreboard]);
}

function hit() {
    player.hit();
    // console.log cards
    console.log(`Player cards: ${player.show()}.
    Score: ${player.score()}.`);
    // display cards
    $("#playerHand").empty();
    $("#playerHand").text(`Cards: ${player.show()}.`);
    $("#playerHand").append(`<br>Score: ${player.score()}.`)
}

function getRandomInt(min, max) {
    // return 1 random integer between min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function shuffle(decks) {
    // empty deck
    deck = [];
    // generate deck
    for (let i = 0; i < decks; i++) {
        for (let suit of suits) {
            let j = 0;
            for (let face of faces) {
                deck.push([`${face}${suit}`, scoresA1[j]]);
                j++;
            }
        }
    }
    return null;
}

function pickupTopCard() {
    // declare variables
    let randomIndex = Math.floor(Math.random() * deck.length);
    // return card
    if (deck.length >= 1) {
        return deck.splice(randomIndex, 1)[0]; // Take this card out of the deck.
    } else if (deck.length === 0) {
        return null; // Error: no cards left to take out of the deck.
    }
}

function arraySum(nums) {
    let numTot = 0;
    for (let num of nums) {
        numTot += num;
    }
    return numTot;
}

function scoreGame(player, house) {
    if (player <= 21 && house <= 21) {
        if (player > house) {
            return [1, 0, 0, "Congratulations, you won!"];
        } else if (player === house) {
            return [0, 1, 0, "You tied: it's a push."];
        } else if (player < house) {
            return [0, 0, 1, "Sorry, you lost."];
        }
    } else if (player > 21 && house <= 21) {
        return [0, 0, 1, "Sorry, you lost."];
    } else if (player > 21 && house > 21) {
        return [0, 1, 0, "You tied: it's a push."];
    } else if (player <= 21 && house > 21) {
        return [1, 0, 0, "Congratulations, you won!"];
    }
}