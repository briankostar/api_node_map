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
//eg. /api/v1/username
var router1 = express.Router();
router1.get('/', function(req, res){res.send('hello this is version 1')});
router1.route('/users')
.post(function(req, res){
    var user = new User();
    //get user name from x-www-form request to /users or via form POST
    user.name = req.body.name;
    user.save(function(err){
	if(err)
	    res.send(err);
	res.json({message: 'User created: ' + user.name});
    });
})
.get(function(req, res){
    User.find(function(err, datas){
	if(err)
	    res.send(err);
	res.json(datas);
    });
})

//RESTful API for each username
router1.route('/users/:username')
.get(function(req, res){
    User.findById(req.params.username, function(err, user){
	if(err)
	    res.send(err);
	res.json(user);
    });
})
.put(function(req, res){
    User.findById(req.params.username, function(err, user){
	if(err)
	    res.send(err);
	user.name = req.body.name;
	user.save(function(err){
	    if(err)
		res.send(err);
	    res.json({message:'username updated'});
	});

    });
})
.delete(function(req, res){
    User.remove({name: req.params.username}, function(err, user){
	if(err)
	    res.send(err);
	res.json({message:'deleted: ' + req.params.username});

    });
});

//attach routers to app
app.use('/api/v1', router1);

app.get('/', function(req, res){res.send("hi")})

app.listen(port);
console.log("Magic on " + 8080);
