// Variables
const suits = ["-S", "-C", "-D", "-H"];
const faces = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const scoresA1 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1]
// const scoresA11 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
let deck = [];
let status = 1; // game status. 1=ongoing. 0=over.

// Objects
const house = {
    cards: [],
    scores: [],
    draw: function() {
        let tempArray = pickupTopCard();
        console.log(tempArray);
        // add card & register score
        this.cards.push(tempArray[0]);
        this.scores.push(tempArray[1]);
    },
    hit: function() {
        // alias for draw
        this.draw();
    },
    show: function() {
        return [...this.cards];
    },
    score: function() {
        let myScore;
        for (let score of this.scores) {
            myScore += score;
        }
        return myScore;
    }
};

const player = {
    cards: [],
    scores: [],
    draw: function() {
        let tempArray = pickupTopCard();
        console.log(tempArray);
        // add card & register score
        this.cards.push(tempArray[0]);
        this.scores.push(tempArray[1]);
    },
    hit: function() {
        // alias for draw
        this.draw();
    }, 
    show: function() {
        return [...this.cards];
    },
    stand: function() {
        // do not add a card & end the game
    },
    score: function() {
        let myScore;
        for (let score of this.scores) {
            myScore += score;
        }
        return myScore;
    }
};

// Event Listeners
window.onload = function() {
    // generate deck; e.g., shuffle(1) means using 1 deck of 52 cards,
    // shuffle(2) means using 2 decks of 52 cards, etc.
    shuffle(1);
    // deal the cards
    player.draw();
    house.draw();
    player.draw();
    house.draw();
    // show the cards
    console.log(`House cards: ${house.show()}.
    Score: ${house.score()}.`);
    console.log(`Player cards: ${player.show()}.
    Score: ${player.score()}.`);
};

$('#hit').click(function() {
    alert("Hello");
    console.log("clicked the hit button");
});

$('#stand').click(function() {
    console.log("clicked the stand button");
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
                deck.push([face+suit, scoresA1[i]]);
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