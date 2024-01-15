
let card = {
    value: "",
    id: "",
    faceImagePath: "",
    backImagePath: "",
    faceShown: false,

    switchCardFace : function() {
        let cardFace = "#" + this.id + " img:nth-child(1)";
        let cardBack = "#" + this.id + " img:nth-child(2)";

        if (this.faceShown) {            
            $(cardFace).hide();
            $(cardBack).show();
        } else {
            $(cardFace).hide();
            $(cardBack).show();
        }

        this.faceShown = !this.faceShown;
    }
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
    }
    console.log(cardDeck);
}

$(document).ready(function() {

$(".card").on("click", function(){
    $(this).switchCardFace();
});

makeDeck();

function renderDeck() {
    for (let card of cardDeck) {
        var CardDiv = $("<div>");
        CardDiv.attr("id", card.id);
        CardDiv.attr("class", "card");
        CardDiv.append("<img class=\"face\" src=\"" + card.faceImagePath + "\">");
        CardDiv.append("<img class=\"back\" src=\"" + card.backImagePath + "\">");
        $("#game-screen").append(CardDiv);
    }
}

renderDeck();

});
