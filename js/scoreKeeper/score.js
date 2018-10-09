document.addEventListener("DOMContentLoaded", function(){
    button1.addEventListener("click", addPoint1);
    button2.addEventListener("click", addPoint2);
    reset.addEventListener("click", resetScore);
    playToInput.addEventListener("input", newPlayTo);
});

var p1display = document.querySelector("#p1display");
var p2display = document.querySelector("#p2display");
var playToDisplay = document.querySelector("#playToDisplay");
var playToInput = document.querySelector("#playTo");
var button1 = document.querySelector("button#player1");
var button2 = document.querySelector("button#player2");
var reset = document.querySelector("#reset");

var gameOver = false;
var p1score = 0;
var p2score = 0;
var playTo = 5;

function addPoint1(){
    if (gameOver){
        return;
    }
    p1score++;
    p1display.innerHTML = p1score;
    if (p1score === playTo){
        p1display.classList.add("winner");
        gameOver = true;
    }
}

function addPoint2(){
    if (gameOver){
        return;
    }
    p2score++;
    p2display.innerHTML = p2score;
    if (p2score === playTo){
        p2display.classList.add("winner");
        gameOver = true;
    }
}

function resetScore(){
    p1score = 0
    p2score = 0
    p1display.innerHTML = p1score;
    p2display.innerHTML = p2score;
    p1display.classList.remove("winner");
    p2display.classList.remove("winner");
    gameOver = false;
}

function newPlayTo(){
    playTo = Number(playToInput.value);
    playToDisplay.innerHTML = playTo;
}