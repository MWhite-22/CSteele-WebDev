const 	mongoose 			= require('mongoose'),
		passLocalMongoose 	= require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passLocalMongoose);

module.exports = mongoose.model('User', UserSchema);