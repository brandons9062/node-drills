var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = 3000;
var data = require('./data.js')



var app = express();

// Define your middleware function here (or in a separate middleware file if you like)
var checkLogin = function(req,res,next){
    if(req.session.currentUser){
        return next();
    }
    res.status(403).send('User is not logged in');
}

var addId = function(req,res,next){
    req.body.id = data.length;
    next();
};

app.use(bodyParser.json());

app.use(session({
  secret: 'qwertyuiop',
  saveUninitialized: true,
  resave: true
}));

// Do not touch this endpoint
app.post('/login', function(req, res, next) {
	req.session.currentUser = req.body.username;
	if (req.body.username) {
		res.status(200).send('logged in as ' + req.body.username);
	} else {
		res.status(200).send('please provide a username');
	}
	
})


app.get('/data', function(req, res, next) {
	res.status(200).json(data);
})

app.get('/data/:year', function(req, res, next) {
	var year = req.params.year;
	var results = data.filter(function(el) {
		return el.year == year;
	})
	res.status(200).json(results);
})

app.post('/data', checkLogin, function(req, res, next) {
	data.push(req.body);
	res.status(200).json(data);
})

app.put('/data/:year', checkLogin, function(req, res, next) {
	var year = parseInt(req.params.year);
	data.filter(function(el, idx, arr) {
		if (el.year === year) {
			arr[idx] = req.body;
		}
	})
	res.status(200).json(data);
})

app.delete('/data/:year', checkLogin, function(req, res, next) {
	var year = parseInt(req.params.year);
	data = data.filter(function(el) {
		return el.year !== year;
	})
	res.status(200).json(data);
})

app.listen(port, function() {
	console.log('Listening on port',port);
})