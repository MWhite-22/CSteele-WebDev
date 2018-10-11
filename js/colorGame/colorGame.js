var cards = document.querySelectorAll(".card");
var header = document.querySelector("#guess");
var colors = [];
var pickedColor;

function newGame(){
	newColors();

	for (var i=0; i<cards.length; i++){
		cards[i].style.backgroundColor = colors[i];
		cards[i].addEventListener("click", cardClick);
	}

	var pickedColorIndex = Math.floor(Math.random()*6);
	pickedColor = colors[pickedColorIndex];

	header.innerHTML = pickedColor;
}

newGame();

function newColors(){
	colors = [];

	for (var i=0; i<6; i++){
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		colors.push("rgb("+r+", "+g+", "+b+")");
	};

	return colors;
}

function cardClick(){
	if (this.style.backgroundColor === pickedColor){
		alert("Yes!");
	} else {
		this.style.opacity = 0;
	}
}