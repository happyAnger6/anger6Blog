var mongoose = require('mongoose');

var SectionSchema = new mongoose.Schema({
    Name: {type: String, required: [true]},
    Chapter:  mongoose.Schema.ObjectId,
    Section: Number,
    Flag: Number
});

module.exports = mongoose.model('Section', SectionSchema);