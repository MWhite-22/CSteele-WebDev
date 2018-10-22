// ========================================
// 			Require / Import
// ========================================
const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = "8080";

// ========================================
// 			DB Connect
// ========================================
const db = require('./db');

mongoose.connect(db, {useNewUrlParser: true});

// Setting Schema
let campSchema = new mongoose.Schema({
	name: {type: String, default: 'Default Name'},
	image: String,
	description: String,
	likes: {type: Number, default: 0}
});

let Campground = mongoose.model('Campground', campSchema);

// ========================================
// 			Node Config
// ========================================
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// ========================================
// 			Routes
// ========================================
app.get('/', (req, res)=>{
	res.render('home');
});

app.get('/campgrounds', (req, res)=>{
	Campground.find({}, (err, campgrounds)=>{
		if(err){
			console.log('Error:');
			console.log(err);
		} else {
			res.render('index', {campgrounds: campgrounds});
		}
	});
});

app.post('/campgrounds', (req, res)=>{
	let name = req.body.name;
	let imgURL = req.body.imgURL;
	let description = req.body.description;
	let newCampground = {name: name, image: imgURL, description: description};
	Campground.create(newCampground, (err, cg)=>{
		if(err){
			console.log('Error:');
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('/campgrounds/new', (req, res)=>{
	res.render('new');
});

app.get('/campgrounds/:id', (req, res)=>{
	let id = req.params.id;
	Campground.findById(id, (err, foundID)=>{
		if(err){
			console.log('Error:');
			console.log(err);
		} else {
			res.render('show', {campground: foundID});
		}
	});
});

app.get('/*', (req, res)=>{
	res.render('404');
});

// ========================================
// 			Listener
// ========================================

app.listen(port, ()=>{
	console.log('Server started on port: '+port);
});
