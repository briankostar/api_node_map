var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//configure app to use bodyParser. This lets us get data from POST
app.use(bodyParser());

var port = process.env.PORT || 8080;

//connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://kostar:d*3la1ba9DEe*#@ds027509.mongolab.com:27519/mongokostar');


//define mongo data structure
var Schema = mongoose.Schema;
var dataSchema = new Schema({name: String, lat: Number, lng: Number});
var User = mongoose.model('User', dataSchema);

//middleware to log requests
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});

//define route structures for the API
var router1 = express.Router();
router1.get('/', function(req, res){res.send('hello this is version 1')});

var router2 = express.Router();
router2.get('/', function(req, res){res.send("this is router version 2")});

//attach routers to app
app.use('/api/v1', router1);
app.use('/api/v2', router2);

app.get('/', function(req, res){res.send("hi")})

app.listen(port);
console.log("Magic on " + 8080);
