var mongoose = require('mongoose');

var SectionSchema = new mongoose.Schema({
    Name: {type: String, required: [true]},
    Num: Number,
    Chapter:  mongoose.Schema.ObjectId,
    Flag: Number
});

module.exports = mongoose.model('Section', SectionSchema);