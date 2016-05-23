var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html')
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

app.listen(process.env.PORT || 8080)