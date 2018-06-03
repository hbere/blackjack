// Variables
const suits = ["-S", "-C", "-D", "-H"];
const faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const scoresA1 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1]
// const scoresA11 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
let deck = [];
let status = 1; // game status. 1=ongoing. 0=over.
let player = new Player();
let house = new Player();

// Objects
function Player() {
    this.cards = [];
    this.scores = [];
    this.draw = function() {
        let tempArray = pickupTopCard();
        console.log(tempArray);
        // add card & register score
        this.cards.push(tempArray[0]);
        this.scores.push(tempArray[1]);
    };
    this.hit = function() {
        // alias for draw
        this.draw();
    };
    this.show = function() {
        return [...this.cards];
    };
    this.stand = function() {
        // do not add a card & end the game
    };
    this.score = function() {
        let myScore = 0;
        for (let score of this.scores) {
            myScore += score;
            // console.log(score);
        }
        return myScore;
    }
}

// Event Listeners
window.onload = function() {

    // generate deck; e.g., shuffle(1) means using 1 deck of 52 cards,
    // shuffle(2) means using 2 decks of 52 cards, etc.
    shuffle(1);
    // console.log(...deck);
    // deal the cards
    player.draw();
    house.draw();
    player.draw();
    house.draw();
    // show the cards
    console.log(`Player cards: ${player.show()}.
    Score: ${player.score()}.`);
};

$('#hit').click(function() {
    player.hit();
    console.log(`Player cards: ${player.show()}.
    Score: ${player.score()}.`);
});

$('#stand').click(function() {
    // show the cards
    console.log(`House cards: ${house.show()}.
    Score: ${house.score()}.`);
    console.log(`Player cards: ${player.show()}.
    Score: ${player.score()}.`);
});

// Functions
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
                deck.push([face+suit, scoresA1[j]]);
                j++;
            }
        }
    }
    return null;
}

function pickupTopCard() {
    // declare variables
    let randomIndex = Math.floor(Math.random()*deck.length);
    // return card
    return deck.splice(randomIndex, 1)[0];
}

