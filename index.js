
let card = {
    value: "",
    id: "",
    faceImagePath: "",
    backImagePath: "",

    showValueFace : function() {
        $("#" + this.id).show();
    },
    hideValueFace : function() {
        $("#" + this.id).hide();
    }
}


function makeDeck () {
    let cardDeck = [];
    for (let i = 1 ; i <= 10 ; i++){
        let madeCard = {...card};
        madeCard["id"] = String(i);
        madeCard["value"] = "club" + madeCard["id"];
        madeCard["faceImagePath"] = "art/clubs" + madeCard["id"] + ".png";
        madeCard["backImagePath"] = "art/card_back.png";
        cardDeck.push(madeCard)
    }
    console.log(cardDeck);
}




$(document).ready(function() {


$(".card").on("click", function(){
    $(this).hide();
});

makeDeck();

});
