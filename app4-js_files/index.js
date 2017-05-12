var express = require('express');
var bodyParser = require('body-parser');
var data = require('./data');

var app = express();

app.use(bodyParser.json());

app.get('/api/data', function(req,res,next){
    res.status(200).json({
        statusCode: 'ok',
        data:data
    });
})

app.post('/api/data', function(req,res,next){
    var postData = req.body;
    data.push(postData);
    res.status(200).send('ok');
})


app.listen(3000, function(){
    console.log('listening on 3000');
})