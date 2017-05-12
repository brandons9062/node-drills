var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = 3000;
var data = require('./data.js')

var app = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'qwertyuiop',
  saveUninitialized: true,
  resave: true
}));

app.use(function(req,res,next){
    console.log("I'm here guys!");
    next();
})

app.post('/login', function(req, res, next) {
	req.session.currentUser = req.body.username;
	res.status(200).send('logged in');
})

app.put('/logout', function(req,res,next){
    req.session.currentUser = null;
    res.status(200).send('logged out');
})



app.listen(port, function() {
	console.log('Listening on port',port);
})