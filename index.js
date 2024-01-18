
//      3x3 4x4 5x5 6x6 7x7 Would be 5 different difficulity modes
//Diff:  1   2   3   4   5


let game_difficulty = 1; // add 2 for size
let console_log = true;

let card = {
    value: "",
    id: "",
    faceImagePath: "",
    backImagePath: "",
    faceShown: false
}

let cardDeck = [];

function makeDeck () {
    
    for (let i = 1 ; i <= 10 ; i++){
        let madeCard = {...card};
        madeCard["id"] = "club" + String(i);
        madeCard["value"] = "club" + String(i);
        madeCard["faceImagePath"] = "art/clubs" + String(i) + ".png";
        madeCard["backImagePath"] = "art/card_back.png";
        cardDeck.push(madeCard)
        if (console_log) {console.log("F makeDeck: " + madeCard.value);}
    }   
}

function renderDeck() {
    var game_size = game_difficulty + 2;
    var witch = 0;
    for (var row = 1 ; row <= game_size ; row++){
        for (var column = 1 ; column <= game_size ; column++){

            var tempCard = {...cardDeck[witch]};
            if (console_log) {console.log("F renderDeck: " + tempCard.value);}
            witch++;
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

function switchCardFace(cardCopy) {
    var cardId = $(cardCopy).parent().attr("id");
    console.log("112 ", cardId);
    var idParts = cardId.split("c");
    var r = parseInt(idParts[0].replace("r", ""));
    var c = parseInt(idParts[1]);

    var cardIndex = (r - 1) * (game_difficulty + 2) + c - 1;
    if (console_log){console.log("A Card Clicked r/c: " + String(r)+ "/" + String(c) + "| now face Shown " + String(!cardDeck[cardIndex].faceShown) + " |index: " + cardIndex);}

    var back = $(cardCopy).find(".back");
    var face = $(cardCopy).find(".face");
    if (cardDeck[cardIndex].faceShown){
        back.show();
        face.hide();
    } else {
        back.hide();
        face.show();
    }
    cardDeck[cardIndex].faceShown = !cardDeck[cardIndex].faceShown;
}

let firstCard = null;
let firstCardFliped = false;
let game_stop = false;

$(document).ready(function () {
    makeDeck();
    renderDeck();  

    $(document).on("click", ".card", function () {
        
        if (firstCardFliped && !game_stop){
            const currentCard = this;
            switchCardFace(currentCard);
            // jau atverstos abi kortos: this ir firstCard

            setTimeout(() => {
                switchCardFace(firstCard);
                switchCardFace(currentCard);

                game_stop = false;

                firstCard = null;
                firstCardFliped = false;
            }, 333);
            game_stop = true;

            


        } else if (!game_stop) {
            switchCardFace(this);
            firstCard = this;
            firstCardFliped = true;
        }
        
    });
});

