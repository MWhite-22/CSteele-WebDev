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
const 	User 			= require("./models/user");

//Routes
const 	campgroundRoutes 	= require('./routes/campgrounds'),
		commentRoutes		= require('./routes/comments'),
		authRoutes			= require('./routes/auth');

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
app.use((req, res, next)=>{
	res.locals.currentUser = req.user;
	next();
});

// ========================================
// 			Routes
// ========================================
app.use(authRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.get('/*', (req, res)=>{
	res.render('404');
});

// ========================================
// 			Listener
// ========================================
app.listen(port, ()=>{
	console.log('Server started on port: '+port);
});
