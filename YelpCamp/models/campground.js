const mongoose = require('mongoose');

let campSchema = new mongoose.Schema({
	name: {type: String, default: 'Default Name'},
	image: String,
	description: String,
	likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Campground', campSchema);