var mongoose = require('mongoose');

var ChapterSchema = new mongoose.Schema({
    Name: {type: String, required: [true], unique: true},
    Category:  [mongoose.Schema.ObjectId],
    Sections:  [mongoose.Schema.ObjectId],
    Flag: Number
});

module.exports = mongoose.model('Chapter', ChapterSchema);