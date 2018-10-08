console.log("Connected");

var toDo = [];

var input = prompt("What would you like to do?").toUpperCase();

while(input !== "QUIT"){
	if (input === "NEW"){
		newToDo();
	}	else if (input === "LIST") {
		listToDo();
	} else if (input === "DELETE") {
		deleteToDo();
	}
	
	input = prompt("What would you like to do?").toUpperCase();
}

alert("Goodbye");

//*****FUNCTION DECLARATIONS*****
function newToDo(){
	var newToDo = prompt("What do you need to add to the ToDo list?").toUpperCase();
	toDo.push(newToDo);
	console.log(newToDo + " has been added to your ToDo list");
}

function listToDo(){
	console.log("***** TODO LIST *****");
	toDo.forEach(function(item, index){
		console.log(index + ": " + item);
	});
	console.log("***************");
}

function deleteToDo(){
	var deleteIndex = prompt("Enter the index of the Item you wish to delete");
	toDo.splice(deleteIndex, 1);
	console.log("Item " + deleteIndex + " deleted");
}