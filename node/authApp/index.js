const   bodyParser 		        = require('body-parser'),
        passport                = require('passport'),
        LocalStrategy           = require('passport-local'),
        passportLocalMongoose   = require('passport-local-mongoose'),
        mongoose                = require('mongoose'),
        expressSession          = require('express-session'),
        User 			        = require('./models/user');
        express                 = require('express'),
        app                     = express(),
        db 				        = require('./db');
        port                    = '8080'

//Open DB Connection
mongoose.connect(db, {useNewUrlParser: true}, (err)=>{
	if(err){
		console.log('DB CONNECTION ERROR:');
		console.log(err);
	} else {
		console.log('Successful Connection to Database: authApp');
	}
});

//Config express 
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: 'Secrets secrets are no fun',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/secret', (req, res)=>{
    res.render('secret');
});

app.get('/*', (req, res)=>{
    res.render('index');
});


//Listen
app.listen(port, ()=>{
	console.log(`Server started on port: ${port}`);
});