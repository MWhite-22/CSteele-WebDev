// ========================================
// 			Imports/Requires
// ========================================

const express = require("express");
const app = express();
const port = "3000";

// ========================================
// 			Express Configure
// ========================================

app.use(express.static("public"));
app.set("view engine", "ejs");

// ========================================
// 			Routes
// ========================================

app.get("/", function(req, res){
	res.render("home");
});

app.get("/posts", function(req, res){
	let posts = [
		{title: "Post 1", author: "Billy"},
		{title: "Post 2", author: "Bobby"},
		{title: "Post 3", author: "Susy Q"}
	];
	res.render("posts", {posts: posts});
});

app.get("/:thing", function(req, res){
	let thing = req.params.thing;
	res.render("example", {thing: thing});
});

app.get("*", function(req, res){
	res.send("PAGE NOT FOUND");
});

// ========================================
// 			Listen Function
// ========================================

app.listen(port, function(){
	console.log("Server started on port " + port);
});