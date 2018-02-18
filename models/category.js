var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    Name: {type: String, required: [true], unique: true},
    ParentName: String,
    ChildrenNames: [String]
});

module.exports = mongoose.model('Category', CategorySchema);