const 	express 	= require('express'),
		router 		= express.Router(),
		Campground 	= require('../models/campground');

// ========================================
// 			List all Campgrounds
// ========================================
router.get('/', isLoggedIn, (req, res)=>{
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
router.post('/', (req, res)=>{
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

// ========================================
// 			Render New Campground Form
// ========================================
router.get('/new', (req, res)=>{
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