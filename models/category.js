var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    Name: {type: String, required: [true], unique: true},
    ParentName: String,
    ChildrenNames: [String],
    Type: {type: Number, default: 0}, /*0-normal 1-tutorials*/
    Chapters: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('Category', CategorySchema);