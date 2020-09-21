var express = require('express'),
	router = express.Router(),
	job = require('../models/job.js'),
	user = require('../models/user.js'),
	MongoClient = require('mongodb').MongoClient,
	url = 'mongodb://localhost/jobs';

//search all jobs DONE
router.get('/jobs', (req, res) => {
	job.find({}, (err, jobs) => {
		if (err) {
			console.log(err);
		} else {
			console.log('New call on all jobs from mobile');
			res.json({ jobs });
		}
	});
});

router.get('/users', (req, res) => {
	user.find({}, (err, applicants) => {
		if (err) {
			console.log(err);
		} else {
			console.log('New call on all users from mobile');
			res.json({ applicants });
		}
	});
});

//search by designation
router.get('/jobs/:filter', (req, res) => {
	var jobFilter = req.params.filter;

	job.find({ designation: jobFilter }, (err, jobs) => {
		if (err) {
			console.log(err);
		} else {
			console.log('New call on jobs/filter from mobile on: ' + jobFilter);
		}
		res.json({ jobs });
	});
});

//search for a jobs ????
router.get('/job/:jobId', (req, res) => {
	var jobId = req.params.jobId;

	job.findOne({ _id: jobId }, (err, job) => {
		if (err) {
			console.log(err);
		} else {
			console.log('New call on job/jobId from mobile on: ' + job.jobTitle);
		}
		res.json({ job });
	});
});

//create a new user
router.post('/createuser/', (req, res) => {
	var name = req.body.name;
	var surname = req.body.surname;
	var currentPosition = req.body.currentPosition;
	var company = req.body.company;
	var skills = req.body.skills;

	var newUser = {
		username: name + '.' + surname,
		name: name,
		surname: surname,
		currentPosition: currentPosition,
		company: company,
		skills: skills,
	};

	user.create(newUser, (err, newlyCreatedUser) => {
		if (err) {
			console.log(err);
		} else {
			console.log('New call on create user from mobile on: ' + newlyCreatedUser.username);
			console.log(newlyCreatedUser);
			res.json(newlyCreatedUser);
		}
	});
});

//post a new job
router.post(
	'/newjob/',
	(req, res) => {
		var jobTitle = req.body.jobTitle;
		var companyName = req.body.companyName;
		var designation = req.body.designation;
		var phoneNumber = req.body.phoneNumber;
		var email = req.body.email;
		var website = req.body.website;
		var address = req.body.address;
		var jobDescription = req.body.jobDescription;
		var jobSkill = req.body.jobSkill
		var salary = req.body.salary;
		
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		today = mm + '/' + dd + '/' + yyyy;

		MongoClient.connect(url, function (err, db) {
			var dbo = db.db('jobListings');
			dbo.collection('jobs')
				.find()
				.count()
				.then((nb) => {
					var newJob = {
						vacancyNumber: nb,
						jobTitle: jobTitle,
						companyName: companyName,
						datePosted: today,
						designation: designation,
						phoneNumber: phoneNumber,
						email: email,
						website: website,
						address: address,
						jobDescription: jobDescription,
						jobSkill: jobSkill,
						salary: salary,
					};

					job.create(newJob, (err, newlyCreatedJob) => {
						if (err) {
							console.log(err);
						} else {
							console.log(
								'New call on newJob on mobile on: ' + newlyCreatedJob.jobTitle
							);
							console.log(newlyCreatedJob)
							res.json(newlyCreatedJob);
						}
					});
				});
		});
	}
);

//add an user to a job
router.get('/applyToJob/:jobId/:userId', async (req, res) => {
	let jobId = req.params.jobId;
	let userId = req.params.userId;
	let userEx = await user.findOne({ _id: userId }, (err, foundUser) => {
		if (err) console.log(err);
		else {
			return foundUser;
		}
	});

	let jobEx = await job.findOne({ _id: jobId }, (err, foundJob) => {
		if (err) console.log(err);
		else return foundJob;
	});

	let update = jobEx;
	update.applicants.push({
		_id: userId,
		username: userEx.username,
		name: userEx.name,
		surname: userEx.surname,
		currentPosition: userEx.currentPosition,
		company: userEx.company,
		skills: userEx.skills,
	});
	try {
		await job.update({ _id: jobId }, { $set: { applicants: update.applicants } });
	} catch (e) {
		console.log(e);
	}
	console.log('New post to apply to job from mobile');
	res.json(update);
});

//search for an user
router.get('/getuser/:userId', async (req, res) => {
	var userId = req.params.userId;

	let allJobs = await job.find({}, (err, jobsFound) => {
		if (err) console.log(err);
		else return jobsFound;
	});

	let jobs = [];

	for (let i = 0; i < allJobs.length; i++) {
		let ok = false;
		for (let j = 0; j < allJobs[i].applicants.length; j++) {
			if (allJobs[i].applicants[j]._id == userId) {
				ok = true;
			}
		}
		if (ok == true) {
			jobs.push(allJobs[i]);
		}
	}
	console.log('New post to getuser to job from mobile ' + userId);
	res.json({jobs});
});

router.get('/appliedjobs', (req, res) => {
	job.find({}, (err, jobsFound) => {
		if (err) {
			console.log(err);
		} else {
			let jobs = [];
			for (let i = 0; i < jobsFound.length; i++) {
				if (jobsFound[i].applicants.length != 0) {
					jobs.push(jobsFound[i]);
				}
			}
			console.log('New call on applied jobs from mobile');
			res.json({ jobs });
		}
	});
});

module.exports = router;