var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    Content: {type: String, required: [true]},
    Author: String,
    PublishDate: Number
});

var ArticleSchema = new mongoose.Schema({
    Title: {type: String, required: [true], unique: true},
    Content: String,
    Author: {type: String, default: '安哥6'},
    Comments: [CommentSchema],
    Category: String,
    Likes: {type: Number, default: 0},
    UnLikes: {type: Number, default: 0},
    Tags: [String],
    PublishDate: Date
});

module.exports = mongoose.model('Article', ArticleSchema);