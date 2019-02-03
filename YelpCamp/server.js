// ========================================
// 			Require / Import
// ========================================
const 	bodyParser 		= require('body-parser'),
		methodOverride  = require('method-override'),
		passport  		= require('passport'),
		localStrategy  	= require('passport-local'),
		session		  	= require('express-session'),
		mongoose 		= require('mongoose'),
	 	express 		= require('express'),
	 	app 			= express();

// DataBase Models
const Campground 	= require("./models/campground");
const Comment 		= require("./models/comment");
const User 			= require("./models/user");

// Environment Variables
const port 			= "8080";

// ========================================
// 			DB Connect
// ========================================
const db = require('./db');

mongoose.connect(db, {useNewUrlParser: true}, (err)=>{
	if(err){
		console.log('DB Connect Error:');
		console.log(err);
	}else{
		console.log('Connected to YelpCamp Database');
	}
});

// ========================================
// 			Node Config
// ========================================
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));

// ========================================
// 			Auth and Session Config
// ========================================
app.use(session({
	secret: 'Secret Password for Encryption',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========================================
// 			Middleware
// ========================================
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		res.redirect('/login');
	}
}

app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	next();
});

// ========================================
// 			Routes
// ========================================
app.get('/', (req, res)=>{
	res.render('home');
});

app.get('/login', (req, res)=>{
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}));

app.get('/register', (req, res)=>{
	res.render('register');
});

app.post('/register', (req, res)=>{
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user)=>{
		if(err){
			console.log(err);
			return res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, ()=>{
				res.redirect('/campgrounds');
			});
		}
	});
});

app.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});

app.get('/campgrounds', isLoggedIn, (req, res)=>{
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
	Campground.findById(id).populate("comments").exec((err, foundID)=>{
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
