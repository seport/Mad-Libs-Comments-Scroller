var mongoose = require('mongoose')
var url = process.env.MONGODB_URI || 'mongodb://localhost/commentsscroller'
mongoose.connect(url)
module.exports = mongoose