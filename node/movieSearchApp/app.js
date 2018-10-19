// ========================================
// 			Includes/Requires
// ========================================
const express = require('express');
const app = express();
const port = '3000';
const request = require('request');


// ========================================
// 			NPM Config
// ========================================

app.use(express.static('public'));
app.set('view engine', 'ejs');

// ========================================
// 			Variable Declaration
// ========================================

function omdbQuery(e){
	return("http://www.omdbapi.com/?apikey=thewdb&s=" + e);

}

// ========================================
// 			Routes
// ========================================

app.get('/', (req, res)=>{
	res.render("home");
});

app.get('/movies', (req, res)=>{
	const search = req.query.search;
	let query = omdbQuery(search);
	request(query, (error, response, body)=>{
		let parsedBody = JSON.parse(body);
		if(!error && response.statusCode == 200){
			res.render("movieList", {search: search, body: parsedBody});
		}
	});
});

app.get('/movie/:id', (req, res)=>{
	const id = req.params.id;
	res.render("movie", {id: id});
});

app.get('*', (req, res)=>{
	res.send("YOU TOOK A WRONG TURN");
});

// ========================================
// 			Listen
// ========================================

app.listen(port, ()=>{
	console.log('MovieDB Started on port ' + port);
});