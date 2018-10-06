// Create Secret Number
const secret = 4;

function check() {
	//Ask for a guess
	let guess = prompt("Guess a number between 1 and 100");
	guess = Number(guess);

	// Check Guess
	if(guess === secret){
		alert("You got it right!");
		return;
	} else if (guess > secret){
		alert("Wrong! Your guess was too high. Try again.");
		check();
	} else {
		alert("Wrong! Your guess was too low. Try again.");	
		check();
	}
}

document.addEventListener("DOMContentLoaded",check());