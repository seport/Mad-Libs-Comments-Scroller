var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/commentsscroller', function(){
	console.log('mongodb connected')
})
module.exports = mongoose