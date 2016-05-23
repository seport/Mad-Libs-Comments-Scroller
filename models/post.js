var db = require('../db')
var Post = db.model('Post', {
	word: {type: String, required: true}
})
console.log('thing')
module.exports = Post