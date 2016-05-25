var express = require('express')
var bodyParser = require('body-parser')

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

app.get('/api/posts', function(req, res){
	Post.find(function(err, posts){
		if(err){ return next(err) }
		res.json(posts)
	})
})

var Post = require('./models/post')
app.post('/api/posts', function(req, res, next){
	if(/pike?(ys?|ies)|pakis?|(ph|f)agg?s?([e0aio]ts?|oted|otry)|nigg?s?|nigg?[aeoi]s?|(ph|f)[@a]gs?|n[i!j1e]+gg?(rs?|ett?e?s?|lets?|ress?e?s?|r[a0oe]s?|[ie@ao0!]rs?|r[o0]ids?|ab[o0]s?|erest)|j[!i]gg?[aer]+(boo?s?|b00?s?)|jigg?[aer]+(b[0o]ing)|p[0o]rch\\s*-?m[0o]nke?(ys?|ies?)|g(ooks?|00ks?)|k[iy]+kes?|b[ea]ne[ry]s?|(towel|rag)\\s*heads?|wet\\s*backs?|dark(e?y|ies?)|(shit|mud)\\s*-?skins?|tarbab(ys?|ies?)|ape\\s*-?fricans?|lesbos?|coons?(y|i?e?s?|er)|trann(ys?|ies?)|mignorants?|lady\\s*-?boys?|spics?|/?r?/?coon\\s*town|/?r?/?ni?1?ggers?|you\\s*('?re|r)gay|shit\\s*lords?|Homos?",  "groids?|chimpires?|mud\\s*childr?e?n?|n[1!i]gs?-?|gays?(est|ly|er)|dune\\s*coone?r?s?|high\\s*yellows?|shee?\\s*boons?|cock\\s*suckers?|tards?|retards?|retard\\*s?(ed|edly)|cunts?y?|dot\\s*heads?|china\\s*m[ae]n|queer\\s*bags?|NAMBLA|fucking\\s*(whores?)|puss(y|ies?)|ghey|whore\\s*mouth|fuck\\s*boys?|fat\\s*fucks?|obeasts?|fuck\\s*(wits?|tards?)",  "beetusbehemoths?|book\\s*fags?|shit\\s*(bags?|dicks?)|twats?|fupas?|holo\\s*hoaxe?s?|Muslimes?|dind[ous]|boot\\s*lips?|jig\\s*apes?|nig\\s*town|suspooks?"]/.test(req.body.word)){

	}
	else{
		var post = new Post({
			word: req.body.word
		})
		post.save(function(err, post){
			if(err){ return next(err) }
			res.json(201, post)
		})
	}
})

app.delete('/api/posts/:id', function(req, res, next){
	Post.findOneAndRemove({'_id': req.params.id}, function(err, result){
		res.json({
			message: "successfully deleted the post",
			post: result
		})
	})
})

app.listen(process.env.PORT || 8080)