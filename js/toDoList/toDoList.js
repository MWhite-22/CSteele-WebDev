console.log("Connected");

var toDo = [];

var input = prompt("What would you like to do?").toUpperCase();

while(input !== "QUIT"){
	if (input === "NEW"){
		var newToDo = prompt("What do you need to add to the ToDo list?").toUpperCase();
		toDo.push(newToDo);
	}	else if (input === "LIST") {
		alert("Your current ToDo list is: " + toDo);
	}
	
	input = prompt("What would you like to do?").toUpperCase();
}

alert("Goodbye");