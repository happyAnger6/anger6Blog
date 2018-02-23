var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    Content: {type: String, required: [true]},
    Author: String,
    PublishDate: Number

});

module.exports = mongoose.model('Comment', CommentSchema);