const 	mongoose 	= require('mongoose'),
		Campground 	= require('../models/campground'),
		Comment		= require('../models/comment'),
		db			= require('../db.js');

mongoose.connect(db, {useNewUrlParser: true}, (err)=>{
	if(err){
		console.log('DB Connect Error:');
		console.log(err);
	}else{
		console.log('Connected to YelpCamp Database');
	}
});

const seedData = [
	{
		name: "Salmon Creek",
		image: "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb",
		description: "Lots of fish. Lots of stank",
	},
	{
		name: "Hilly Hill",
		image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb",
		description: "Get your hiking boots ready - this one is a doozy",
	},
	{
		name: "Mnt. Mountain",
		image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb",
		description: "Climb your ass all the way up, just to then climb your ass all the way down. FUN!",
	},
	{
		name: "Happy Place",
		image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb",
		description: "Friends, Family, Fun, Fear of Poison Ivy. What more could you ask for?",
	},
	{
		name: "Beach Blast",
		image: "https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?auto=compress&cs=tinysrgb",
		description: "Watch out for sinkholes at this wild beach camp ground",
	}
];


function seedDB(){
	Comment.remove({}, (err)=>{
		if(err){
			console.log(err);
		} else {
			console.log('All Comments Removed');
		}
	}).then(
		Campground.remove({}, (err)=>{
			if(err){
				console.log(err);
			} else {
				console.log("Removed all campgrounds");
				let i = 1;
				seedData.forEach((seed)=>{
					Campground.create(seed, (err, camp)=>{
						let name = camp.name;
						if(err){
							console.log(err);
						} else {
							console.log("Added '"+name+"' to campgrounds");

							Comment.create(
								{
									text: `Seed Comment for ${name} - Comment ${i} - Test Test Test`,
									author: "MWhite"
								}, (err, comment)=>{
									if(err){
										console.log(err);
									}else{
										camp.comments.push(comment);
										camp.save();
										console.log(`Comment ${i} has been created for post ${name}`);
										i++;
									}
								}
							);
						};
					});
				});
			}
		})
	);
};

seedDB();