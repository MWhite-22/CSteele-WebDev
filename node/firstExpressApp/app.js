const express = require("express");
const app = express();
const port = "3000";

app.get("/", function(req, res){
	res.render("home.ejs");
});

app.get("/posts", function(req, res){
	let posts = [
		{title: "Post 1", author: "Billy"},
		{title: "Post 2", author: "Bobby"},
		{title: "Post 3", author: "Susy Q"}
	];
	res.render("posts.ejs", {posts: posts});
});

app.get("/:thing", function(req, res){
	let thing = req.params.thing;
	res.render("example.ejs", {thing: thing});
});

app.get("*", function(req, res){
	res.send("PAGE NOT FOUND");
});

app.listen(port, function(){
	console.log("Server started on port " + port);
});