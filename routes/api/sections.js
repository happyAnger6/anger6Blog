var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Section = require('../../models/section');
var Chapter = require('../../models/chapter');
var Category = require('../../models/category');

router.get('/json', function(req, res, next) {
    Section.find(function(err, sections){
       if (err)  {
           return next(err);
       }
       res.json(sections);
    })
});

router.post('/create', function(req, res, next){
   var section = new Section(req.body);
   Chapter.findOne({_id: mongoose.Types.ObjectId(section.Chapter)}, function(err, chapter){
       if (err) return next(err);
       if (chapter === null) {
           var err = 'chapter is not exist!';
           return res.status(500).json({errmsg: err});
       }
       section.save(function (err, s){
           if (err) return next(err);
           chapter.Sections.push(s._id);
           chapter.save(function (err, u){
               if (err) {
                   return next(err);
               }
               res.json(s);
           })
       })
   })
});

router.post('/:id/delete', function(req, res, next){
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    Section.findOne({_id: mid}, function (err, section){
        if (err) {
            return next(err);
        }
        if (section === null) {
            var err = 'section is not exist!';
            return res.status(500).json({errmsg: err});
        }
        Chapter.findOne({_id: section.Chapter}, function(err, chapter) {
            if (err) {
                return next(err);
            }
            if (chapter !== null) {
                var index = chapter.Sections.indexOf(section._id);
                if(index > -1) {
                    chapter.Sections.splice(index,1);
                }
            }
            chapter.save(function (err, p){
                if (err) {
                    return next(err);
                }
               section.remove(function (err, r){
                   if (err) {
                       return next(err);
                   }
                   res.json({});
               });
            });
        });
    });
});

module.exports = router;