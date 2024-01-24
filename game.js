
//      3x3 4x4 5x5 6x6 7x7 Would be 5 different difficulity modes
//Diff:  1   2   3   4   5

// td{with r/c id} > div{with id club10 and card class} > 2 imgs

let game_difficulty = 1; // add 2 for size
let testing_log = true;
if (localStorage.scores === ""){
    $("#diffDisplay").html("Dif");
} else {
    $("#diffDisplay").html("Di");
    localStorage.setItem("scores", "");
}

const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

function makeDate (d) {
    var month = (d.getMonth() + 1).toString();
    var day = d.getDate();
    return months[month] + " " + day;
}

function differeceOfDates (d1, d2) {
    return ((d2.getTime() - d1.getTime()) / 1000).toString();
}

let card = {
    value: "",
    id: "",
    faceImagePath: "",
    backImagePath: "",
    faceShown: false,
    state: "notFound",
    showInfo (additionalStart = "", additionalEnd = "") {
        console.log(
            additionalStart +
            "\n|value: " + this.value + 
            "\n|id: " + this.id + 
            "\n|faceShown: " + this.faceShown +
            "\n|state: " + this.state +
            additionalEnd
        );
    }
}

let blankCard = {...card};
blankCard.value = "blank";
blankCard.id = "blankCard";
blankCard.state = "notFound"
blankCard.faceImagePath = "art/blankCard.png";
blankCard.backImagePath = "art/card_back.png";

function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

function arrayShuffling(array) {
    for (var i = array.length - 1 ; i > 0 ; i--){
        const j = getRandomInt(i+1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let fullCardDeck = []; // Has all the cards of /art folder.
function makeDeck () {
    for (var type of ["club", "heart"]){
        for (var v of ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]){
            let madeCard = {...card};
            madeCard["id"] = type + v;
            madeCard["value"] = type + v;
            madeCard["faceImagePath"] = "art/" + type + "s" + v + ".png";
            madeCard["backImagePath"] = "art/card_back.png";
            fullCardDeck.push(madeCard)
            if (testing_log) {madeCard.showInfo();}
        }
    }
}

let newDeck = []; // Has only the cards that will be played with.
function renderDeck() {

    var game_size = game_difficulty + 2;
    var cardsTotal = game_size * game_size;
    var cardAmountNeeded = cardsTotal % 2 == 0 ? cardsTotal / 2 : (cardsTotal-1) / 2;
    newDeck = fullCardDeck.slice(0, cardAmountNeeded);
    newDeck = newDeck.concat(newDeck);
    
    if (game_difficulty % 2 != 0){
        newDeck = newDeck.concat(blankCard);
    }
    newDeck = arrayShuffling(newDeck);
    
    var index = 0;
    for (var row = 1 ; row <= game_size ; row++){
        for (var column = 1 ; column <= game_size ; column++){

            var tempCard = {...newDeck[index]};
            if (testing_log) {console.log("F renderDeck: " + tempCard.value);}
            index++;
            var CardDiv = $("<div>");
            CardDiv.attr("id", tempCard.id);
            CardDiv.attr("class", "card");
            CardDiv.append("<img class=\"face\" src=\"" + tempCard.faceImagePath + "\">");
            CardDiv.append("<img class=\"back\" src=\"" + tempCard.backImagePath + "\">");

            var cell = "#r" + String(row) + "c" + String(column);
            $(cell).append(CardDiv);
        }
    }
}

function figureOutCardIndexInNewDeckByParentId (cardId) {
    // Card id is: $(card).parent().attr("id");
    var idParts = cardId.split("c");
    var r = parseInt(idParts[0].replace("r", ""));
    var c = parseInt(idParts[1]);
    var cardIndex = (r - 1) * (game_difficulty + 2) + c - 1;
    return cardIndex;
}

function switchCardFace(cardCopy, val="") {
    var cardIndex = figureOutCardIndexInNewDeckByParentId($(cardCopy).parent().attr("id"));
    
    var back = $(cardCopy).find(".back");
    var face = $(cardCopy).find(".face");
    if (val === "hide") {
        face.hide();
        back.show();
        newDeck[cardIndex].faceShown = false;
    } else if (val === "show") {
        face.show();
        back.hide();
        newDeck[cardIndex].faceShown = true;
    } else {
        if (newDeck[cardIndex].faceShown){
            back.show();
            face.hide();
        } else {
            back.hide();
            face.show();
        }
        newDeck[cardIndex].faceShown = !newDeck[cardIndex].faceShown;
    }
}

let firstCard = null;
let newDeckFirstCard = null;
let firstCardFliped = false;
let game_stop = false;
let firstIndex = null;

let gameCardsLeft = (game_difficulty + 2) * (game_difficulty + 2);

function resetGame() {
    $("#diffDisplay").html(String(game_difficulty));
    for (var row = 1 ; row <= 7 ; row++){
        for (var column = 1 ; column <= 7 ; column++){
            $("#r" + String(row) + "c" + String(column)).html("");
        }
    }
    newDeck = [];
    firstCard = null;
    newDeckFirstCard = null;
    firstCardFliped = false;
    game_stop = false;
    firstIndex = null;
    gameCardsLeft = (game_difficulty + 2) * (game_difficulty + 2);
    fullCardDeck = arrayShuffling(fullCardDeck);
    renderDeck();
    startTimer = new Date();
}

$(document).ready(function () {
    makeDeck();
    fullCardDeck = arrayShuffling(fullCardDeck);
    renderDeck();
    let startTimer = new Date();

    $(document).on("click", ".card", function () {

        var curCardIndex = figureOutCardIndexInNewDeckByParentId($(this).parent().attr("id"))
        var curCard = newDeck[curCardIndex];
        var correctQuess = false;
        if (!game_stop && curCard.state !== "found"){
            
            if (!firstCardFliped){
                if (curCard.value === "blank"){
                    newDeck[curCardIndex].state = "found";
                    switchCardFace(this, "show");
                    gameCardsLeft--;
                    
                } else {
                    newDeckFirstCard = curCard;
                    firstCard = this;
                    firstCardFliped = true;
                    firstIndex = curCardIndex;
                    switchCardFace(firstCard, "show");
                }
            } 

            else if (firstCardFliped) {
                switchCardFace(this, "show");
                if (newDeck[firstIndex].value === newDeck[curCardIndex].value){
                    correctQuess = true;
                } else {
                    setTimeout(() => {
                        switchCardFace(firstCard, "hide");
                        switchCardFace(this, "hide");
                        firstCard = null;
                        firstCardFliped = false;
                        game_stop = false;
                    }, 420);
                    game_stop = true;
                }

                if (correctQuess) {
                    newDeck[firstIndex].state = "found";
                    newDeck[curCardIndex].state = "found";
                    switchCardFace(firstCard, "show");
                    switchCardFace(this, "show");
                    firstCard = null;
                    firstCardFliped = false;
                    gameCardsLeft = gameCardsLeft - 2;
                }
            }
        }

        if (gameCardsLeft == 0){            
            var currentScores = localStorage.getItem("scores");
            var cT = new Date();
            currentScores += "<li>" + makeDate(startTimer) + ":  " + differeceOfDates(startTimer, cT) + "</li>";
            localStorage.setItem("scores", currentScores);
            document.dispatchEvent(EVENT_gameFinished);
        }
    });



    $(document).on("click", "#diffIncrease", function () {
        if(game_difficulty < 5){
            game_difficulty++;
            resetGame();
        } else {
            // Flash red?
        }
    });

    $(document).on("click", "#diffDecrease", function () {
        if (game_difficulty > 1) {
            game_difficulty--;
            resetGame();
        } else {
            // Flash red?
        }
    });

    $(document).on("click", "#resetButton", function(){
        resetGame();
    });
});

