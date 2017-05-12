var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var data = require('./data.js')

var app = express();

app.use(bodyParser.json());

app.get('/api/data', function(req,res,next){
    var q = req.query;
    
    var filteredData = data.filter(function(obj){
        for(var key in q){
            if(obj[key] !== q[key]){
                return false;
            }
        }
        return true;
    })
    
    res.status(200).json(filteredData);
})

app.post('/api/data', function(req,res,next){
    var postData = req.body;
    data.push(postData);
    res.status(200).send('ok!');
})

app.get('/api/data/:id', function(req,res,next){
    var id = req.params.id;
    res.status(200).json(data[id]);
})

app.delete('/api/data/:id', function(req,res,next){
    data.splice(req.params.id,1);
    res.status(200).send('Deleted');
})

app.put('/api/data/:id', function(req,res,next){
    var i = req.params.id;
    var q = req.query;
    
    for(var key in q){
        data[i][key] = Number(q[key]);
    }
    res.status(200).send('Done Got Put');
})


app.listen(port, function() {
	console.log('Listening on port',port);
})