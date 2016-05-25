var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.sendfile('index.html')
})

app.get('/api/posts', function(req, res){
	Post.find(function(err, posts){
		if(err){ return next(err) }
		res.json(posts)
	})
})

var Post = require('./models/post')
app.post('/api/posts', function(req, res, next){
	var post = new Post({
		word: req.body.word
	})
	post.save(function(err, post){
		if(err){ return next(err) }
		res.json(201, post)
	})
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.listen(process.env.PORT || 8080)