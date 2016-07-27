var player1name = "";
var player2name = "";
var beginGame = false;
var serveSet = false;
var player1score = 0;
var player2score = 0;
var lastScore1 = 0;
var lastScore2 = 0;
var player1serving = false;
var gameFinish = false;
var playerServingFlipLast = false;

var player1dialog = $( "#dialog-form1" ).dialog({
  autoOpen: true,
  height: 300,
  width: 350,
  modal: true,
  buttons: {
    "Add": function(){
        player1name = $("#player1name").val();
        player2name = $("#player2name").val();
        player1dialog.dialog( "close" );
        $("#player1 div h1").html(player1name);
        $("#player2 div h1").html(player2name);
        beginGame = true;
    }
  }
});


$( "#player1" ).click(function() {
    lastScore1 = player1score;
    lastScore2 = player2score;
    if(beginGame){
        if(serveSet){
            player1score++;
        } else {
            player1serving = false;
        }
        renderScore();
    }
});
$( "#player2" ).click(function() {
    lastScore1 = player1score;
    lastScore2 = player2score;
    if(beginGame){
        if(serveSet){
            player2score++;
        } else {
            player1serving = true;
        }
        renderScore();
    }
});
$( "#resetButton" ).click(function() {
    reset();
});
$( "#undoButton" ).click(function() {
    player1score = lastScore1;
    player2score = lastScore2;

    if(playerServingFlipLast) {
        player1serving = !player1serving;
        playerServingFlipLast = false;
    }

    renderScore();
});
var switchToggle = false;
$( "#switchButton" ).click(function() {
    if(!switchToggle){
        $("#player1").before($("#player2"));
    } else {
        $("#player2").before($("#player1"));
    }
    switchToggle = !switchToggle;
});
function reset(){
    responsiveVoice.speak("resetting");
    serveSet = false;
    player1score = 0;
    player2score = 0;
    lastScore1 = 0;
    lastScore2 = 0;
    player1serving = false;
    gameFinish = false;
    beginGame = false;
    $("#player1 div").css("background-color", "#bdc3c7");
    $("#player2 div").css("background-color", "#bdc3c7");

    $("#player1 div h1").html("");
    $("#player2 div h1").html("");
    $('#score1').html(0);
    $('#score2').html(0);

    player1dialog.dialog( "open" );
}

var renderScoreCount = 0;
function renderScore(){

    if(beginGame){
        renderScoreCount++;
        if(renderScoreCount == 1){
            playerServingFlipLast = true;
        }
        $("#player1 div").css("background-color", "#bdc3c7");
        $("#player2 div").css("background-color", "#bdc3c7");

        serveSet = true;

        $('#score1').html(player1score);
        $('#score2').html(player2score);

        var checkScore = player1score + player2score;

        if (checkScore%2 == 0){
            player1serving = !player1serving;
            playerServingFlipLast = true;
        } else if(checkScore > 20) {
            player1serving = !player1serving;
            playerServingFlipLast = true;
        } else playerServingFlipLast = false;
        if(player1serving) {
            $("#player1 div").css("background-color", "#e74c3c");
        } else $("#player2 div").css("background-color", "#e74c3c");

        if(player1score >= 11 && player2score < (player1score-1)){
            //Player 1 Won
            responsiveVoice.speak(player1name + " has won");
            gameFinish = true;
        } else if(player2score >= 11 && player1score < (player2score-1)) {
            //Player 2 Won
            responsiveVoice.speak(player2name + " has won");
            gameFinish = true;
        }

        if(!gameFinish){
            if(player1score == 0 && player2score == 0) {
                if(player1serving){
                    responsiveVoice.speak(player1name + " to serve");
                } else {
                    responsiveVoice.speak(player2name + " to serve");
                }

            } else if(player1score >= 10 && player2score >= 10){
                if(player1score > player2score){
                    //player 1 advantage
                    responsiveVoice.speak(player1name + " advantage");
                } else if(player1score < player2score) {
                    //player 2 advantage
                    responsiveVoice.speak(player2name + " advantage");
                } else if(player1score == 10 && player2score == 10) {
                    responsiveVoice.speak("duce");
                } else if(player1score == player2score) {
                    responsiveVoice.speak(player1score + " all");
                }
            } else if(player1score > player2score){
                responsiveVoice.speak(player1score + " " + player2score);
            } else if (player1score < player2score){
                responsiveVoice.speak(player2score + " " + player1score);
            } else {
                responsiveVoice.speak(player1score + " all");
            }
        }
    }

}
