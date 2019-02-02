const mongoose = require('mongoose');

const campSchema = new mongoose.Schema({
	name: {type: String, default: 'Default Name'},
	image: String,
	description: {type: String, trim: true},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	likes: {type: Number, default: 0},
	score: {type: Number, default: 0},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Campground', campSchema);