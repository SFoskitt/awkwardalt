
/* shortly-angular */

  var express     = require('express'),
      mongoose    = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/shortly'); // connect to mongo database named shortly

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;


 // Walkthrough of the server

 //  Express, mongoose, and our server are initialzed here
 //  Next, we then inject our server and express into our config/middlware.js file for setup
 //    we also exported our server for easy testing, it is then started in index.js

 //  middleware.js requires all epxpress middlware and sets it up
 //  our authentication is set up there as well
 //  we also create individual routers for are two main features, links and users
 //  each feature has it's own folder with a model, controller, and route file
 //    the respective file is requierd in middlware.js and injected with its mini router
 //    that route file then requires the respective controller and sets up all the routes
 //    that controller then requires the respective model and sets up all our endpoints which respond to request


/* awkwardalps */

// var express = require('express');
// var mongoose = require('mongoose');
// var path = require('path');

// var app = express();
// // var port = /*process.env.PORT || */ 8000; //dynamic port assignment for deployment purposes
// var __
// app.use(express.static(__dirname + '/..')); 
// // app.use(express.static('client')); 

// app.get("/", function (req, res) {
//   res.sendFile('index.html', {root: __dirname + '/../client/app'});

// });

// require('./middleware.js')(app, express);

// var server = app.listen(8000, function () {

//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
//   // console.log(root.process.env.PWD)

// });

