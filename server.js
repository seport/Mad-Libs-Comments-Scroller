var express = require('express')
var bodyParser = require('body-parser')
var socket = require('socket.io')

var app = express()
app.use(bodyParser.json())

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin',"*");
	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers','Content-Type');
	next();
})

app.get('/', function(req, res){
	res.sendfile('index.html')
})

// app.get('/api/posts', function(req, res){
// 	Post.find(function(err, posts){
// 		if(err){ return next(err) }
// 		res.json(posts)
// 	})
// })

// var Post = require('./models/post')
// app.post('/api/posts', function(req, res, next){
	
// 	var post = new Post({
// 		word: req.body.word
// 	})
// 	post.save(function(err, post){
// 		if(err){ return next(err) }
// 		res.json(201, post)
// 	})
// })

// app.delete('/api/posts/:id', function(req, res, next){
// 	Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
// 		res.json({
// 			message: "successfully deleted the post",
// 			post: result
// 		})
// 	})
// })

var server = app.listen(process.env.PORT || 8080, function(){
	console.log(`listening on port ${process.env.PORT || 8080}`)
})

// socket setup
var io = socket(server)

io.on('connection', function(socket){
	console.log('made socket connection', socket.id)

	socket.on('chat message', function(msg){
	  console.log('message: ' + msg);
	  io.emit('chat message', msg);
	});
  });