
let EVENT_gameFinished = new Event("gameFinished");
let showGameScreen = true;

function switchScreens(){
    if (!showGameScreen) {
        $("#game-screen").show();
        $("#game-leaderboard").hide();
        $("#switchGameAndScoreboard").html("Scores");
    } else {
        $("#game-screen").hide();
        $("#game-leaderboard").show();
        $("#switchGameAndScoreboard").html("Game");
    }
    showGameScreen = !showGameScreen;
}

$(document).ready(function (){
    $("#game-leaderboard").hide();
    document.addEventListener("gameFinished", function(){
        switchScreens();
        $("#game-leaderboard").html("<ol>" + localStorage.getItem("scores") + "</ol>");
    });

    $("#switchGameAndScoreboard").click(function (){
        switchScreens();
    });

    $("#bX").click(function (){
        window.history.go(-1);
    });
});