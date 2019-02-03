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

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========================================
// 			Middleware
// ========================================
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


//Routes
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/secret', isLoggedIn, (req, res)=>{
    res.render('secret');
});

//Login Routes
app.get('/login', (req, res)=>{
    res.render('login');
});

app.post('/login', passport.authenticate("local",
    {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }), (req, res)=>{
        res.redirect('/secret');
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/');
});


//Auth Routes
app.get('/register', (req, res)=>{
    res.render('register');
});

app.post('/register', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    User.register(new User({username: username}),password,(err, user)=>{
        if(err){
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate("local")(req, res, ()=>{
                res.redirect('/secret');
            });
        }
    })
});

app.get('/*', (req, res)=>{
    res.render('index');
});


//Listen
app.listen(port, ()=>{
	console.log(`Server started on port: ${port}`);
});