const 	express 	= require('express'),
		router 		= express.Router({mergeParams: true}),
		Campground 	= require('../models/campground'),
		Comment 	= require('../models/comment');


// ========================================
// 		New Comment Page
// ========================================
router.get('/new', isLoggedIn, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
		}else{
			res.render('comments/new', {campground: campground});
		}
	});
});

// ========================================
// 		Handles New Comment Logic
// ========================================
router.post('/', isLoggedIn, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err){
			console.log(err);
			res.redirect('/campgrounds/'+campground._id)
		}else{
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect('/campgrounds/'+campground._id);
				}
			});
		}
	});
});

// Middleware
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