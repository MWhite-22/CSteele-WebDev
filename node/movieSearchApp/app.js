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
// 			Routes
// ========================================

app.get('/', (req, res)=>{
	res.render("home");
})

// ========================================
// 			Listen
// ========================================

app.listen(port, ()=>{
	console.log('MovieDB Started on port ' + port);
})