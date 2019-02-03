const 	express 	= require('express'),
		router 		= express.Router(),
		Campground 	= require('../models/campground');

// ========================================
// 			List all Campgrounds
// ========================================
router.get('/', (req, res)=>{
	Campground.find({}, (err, campgrounds)=>{
		if(err){
			console.log('Error:');
			console.log(err);
		} else {
			res.render('campgrounds/index', {campgrounds: campgrounds});
		}
	});
});

// ========================================
// 			Add New Campground Logic
// ========================================
router.post('/', isLoggedIn, (req, res)=>{
	const newCampground = {
		name: req.body.name,
		image: req.body.imgURL,
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	};
	Campground.create(newCampground, (err, campground)=>{
		if(err){
			console.log('Error:');
			console.log(err);
		} else {
			console.log('New Campground - '+campground.name+' added');
			res.redirect('/campgrounds');
		}
	});
});

// ========================================
// 			Render New Campground Form
// ========================================
router.get('/new', isLoggedIn, (req, res)=>{
	res.render('campgrounds/new');
});

// ========================================
// 			Show Individual Camgpround Page
// ========================================
router.get('/:id', (req, res)=>{
	let id = req.params.id;
	Campground.findById(id).populate("comments").exec((err, foundID)=>{
		if(err){
			console.log('Error:');
			console.log(err);
		} else {
			res.render('campgrounds/show', {campground: foundID});
		}
	});
});

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

// ========================================
// 			Export
// ========================================
module.exports = router;