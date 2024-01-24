
let EVENT_gameFinished = new Event("gameFinished");

$(document).ready(function (){
    $("#game-leaderboard").hide();
    document.addEventListener("gameFinished", function(){
        $("#game-screen").hide();
        $("#game-leaderboard").show();
    });
});