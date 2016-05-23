var mongoose = require('mongoose')
var url = 'mongodb://heroku_vmhqm4zh:p1lpgha3i5rhp9pgh0kto1pngk@ds011963.mlab.com:11963/heroku_vmhqm4zh'
mongoose.connect(url)
module.exports = mongoose