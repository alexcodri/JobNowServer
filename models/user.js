var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	username: String,
	name: String,
	surname: String,
	currentPosition: String,
	company: String,
	skills: [String],
});

module.exports = mongoose.model("user", userSchema)