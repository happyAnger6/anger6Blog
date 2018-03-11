var mongoose = require('mongoose');

var ChapterSchema = new mongoose.Schema({
    Name: {type: String, required: [true]},
    Num: Number,
    Category: String,
    Sections: [mongoose.Schema.ObjectId],
    Flag: Number
});

module.exports = mongoose.model('Chapter', ChapterSchema);