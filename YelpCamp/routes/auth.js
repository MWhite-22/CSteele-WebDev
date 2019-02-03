const 	express 	= require('express'),
		router 		= express.Router(),
		User 		= require('../models/user'),
		passport 	= require('passport');

// ========================================
// 			Landing Page
// ========================================
router.get('/', (req, res)=>{
	res.render('home');
});

// ========================================
// 			Show Login Page
// ========================================
router.get('/login', (req, res)=>{
	res.render('login');
});

// ========================================
// 			Login Page Logic
// ========================================
router.post('/login', passport.authenticate('local', {
	successRedirect: '/campgrounds',
	failureRedirect: '/login'
}));

// ========================================
// 			Show Register Page
// ========================================
router.get('/register', (req, res)=>{
	res.render('register');
});

// ========================================
// 			Register Page Logic
// ========================================
router.post('/register', (req, res)=>{
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

// ========================================
// 			Logout Logic
// ========================================
router.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/');
});

// ========================================
// 			Export
// ========================================
module.exports = router;