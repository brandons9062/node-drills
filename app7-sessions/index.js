var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');


var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'oakjsdpajifapfjpaosuidfjjiejpaos',
    resave: false,
    saveUninitialized: false
}));

app.post('/api/data', function(req,res,next){
    req.session.data = req.body;
    res.status(200).send('It Worked');
});

app.get('/api/data', function(req,res,next){
    res.status(200).json(req.session.data);
});


app.listen(port, function() {
  console.log('listening to port ', port);
});