var mongoose = require('mongoose')

var jobSchema = mongoose.Schema({
	vacancyNumber: Number,
	jobTitle: String,
	companyName: String,
	datePosted: String,
	designation: String,
	phoneNumber: String,
	email: String,
	website: String,
	address: String,
	jobDescription: String,
	jobSkill: [String],
	salary: String,
	applicants : [{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String,
		name: String,
		surname: String,
		currentPosition: String,
		company: String,
		skills: [String]
	}],
});

module.exports = mongoose.model("job", jobSchema);