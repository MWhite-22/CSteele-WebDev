const mongoose = require('mongoose');

let campSchema = new mongoose.Schema({
	name: {type: String, default: 'Default Name'},
	image: String,
	description: {type: String, trim: true},
	likes: {type: Number, default: 0},
	score: {type: Number, default: 0},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Campground', campSchema);