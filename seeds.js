var MongoClient = require('mongodb').MongoClient,
	jobListing = require('./models/job.js'),
	user = require('./models/user.js'),
	url = 'mongodb://localhost/jobs';

var jobs = [
		{
			vacancyNumber: '1',
			jobTitle: 'Junior Dev',
			companyName: 'Comp1',
			datePosted: '9/18/2020',
			designation: 'Developer',
			phoneNumber: '+40743182160',
			email: 'john@doe1.com',
			website: 'comp1.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: [
				'Java',
				'Oracle',
				'.NET',
				'C#',
				'MongoDB',
				'Javascript',
				'React.js',
				'Angular.js',
				'Vue.js',
				'COBOL',
			],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '2',
			jobTitle: 'Fullstack dev',
			companyName: 'Comp2',
			datePosted: '9/22/2020',
			designation: 'Developer',
			phoneNumber: '+40743182161',
			email: 'john@doe2.com',
			website: 'comp2.com',
			address:
				'Xth Floor, Best Complex, Pipera,Xth Floor, Best Complex, Pipera,Xth Floor, Best Complex, Pipera,Xth Floor, Best Complex, Pipera,Xth Floor, Best Complex, Pipera,Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Javascript', 'React.Js', 'Angular'],
			salary: '$750',
		},
		{
			vacancyNumber: '3',
			jobTitle: 'Middle Android Dev',
			companyName: 'Comp3',
			datePosted: '9/23/2020',
			designation: 'Developer',
			phoneNumber: '+40743182162',
			email: 'john@doe3.com',
			website: 'comp3.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Java', 'Kotlin', 'Android', 'Xamarin'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '4',
			jobTitle: 'C/C++ Dev',
			companyName: 'Comp4',
			datePosted: '9/24/2020',
			designation: 'Developer',
			phoneNumber: '+40743182163',
			email: 'john@doe4.com',
			website: 'comp4.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['C++', 'C'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '5',
			jobTitle: 'Scala Dev',
			companyName: 'Comp5',
			datePosted: '9/25/2020',
			designation: 'Developer',
			phoneNumber: '+40743182164',
			email: 'john@doe5.com',
			website: 'comp5.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Scala', 'MongoDB', '.NET'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '6',
			jobTitle: 'iOS Dev',
			companyName: 'Comp6',
			datePosted: '9/26/2020',
			designation: 'Developer',
			phoneNumber: '+40743182165',
			email: 'john@doe6.com',
			website: 'comp6.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Swift', 'SwiftUI', 'Objective C', 'Firebase'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '7',
			jobTitle: 'Junior Android Dev',
			companyName: 'Comp7',
			datePosted: '9/27/2020',
			designation: 'Developer',
			phoneNumber: '+40743182166',
			email: 'john@doe7.com',
			website: 'comp7.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Java', 'Android'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '8',
			jobTitle: 'Security Officer',
			companyName: 'Comp8',
			datePosted: '9/28/2020',
			designation: 'Officer',
			phoneNumber: '+40743182167',
			email: 'john@doe8.com',
			website: 'comp8.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Bash', 'C'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '9',
			jobTitle: 'Data Protection Officer',
			companyName: 'Comp9',
			datePosted: '9/29/2020',
			designation: 'Officer',
			phoneNumber: '+40743182168',
			email: 'john@doe9.com',
			website: 'comp9.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Data management'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '10',
			jobTitle: 'Lead Developer',
			companyName: 'Comp10',
			datePosted: '9/30/2020',
			designation: 'Developer',
			phoneNumber: '+40743182171',
			email: 'john@doe10.com',
			website: 'comp10.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Leading Skills'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '11',
			jobTitle: 'Manager IT',
			companyName: 'Comp11',
			datePosted: '9/10/2020',
			designation: 'Management',
			phoneNumber: '+40743182169',
			email: 'john@doe11.com',
			website: 'comp11.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['Leading skills'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '12',
			jobTitle: 'Intern .NET',
			companyName: 'Comp12',
			datePosted: '9/12/2020',
			designation: 'Intern',
			phoneNumber: '+40743182170',
			email: 'john@doe12.com',
			website: 'comp12.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: ['.NET'],
			salary: '$750',
			applicants: [],
		},
		{
			vacancyNumber: '13',
			jobTitle: 'Intern IT',
			companyName: 'Comp13',
			datePosted: '9/13/2020',
			designation: 'Intern',
			phoneNumber: '+40743182170',
			email: 'john@doe13.com',
			website: 'comp13.com',
			address: 'Xth Floor, Best Complex, Pipera',
			jobDescription:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
			jobSkill: [],
			salary: '',
			applicants: [],
		}
	]


function seedDB(){
	MongoClient.connect(url, function (err, db) {
	if(err) throw err;
	var dbo = db.db("jobListings")
	dbo.collection('jobs').insertMany(jobs, function (err, res) {
		if (err) throw err;
		console.log('Number of jobs inserted: ' + res.insertedCount);
		db.close();
	});
});
}

module.exports = seedDB;