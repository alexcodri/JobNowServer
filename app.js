const PORT = process.env.PORT || 3000 || 8080

var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	jobListingRoutes = require('./routes/jobListingRoutes'),
	seed = require("./seeds"),
	bodyparser = require('body-parser')



	
app.use(express.static(__dirname+"/public"))
mongoose.connect("mongodb://localhost/jobListings");
app.use(bodyparser.urlencoded({extended: true}));

//seed()

app.listen(PORT, () =>{
	console.log("The server has successfully started on ", PORT)	
})

app.use('/', jobListingRoutes)
//sudo kill -9 $(lsof -t -i:3000)