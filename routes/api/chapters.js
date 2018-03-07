var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Chapter = require('../../models/chapter');
var Category = require('../../models/category');

router.get('/json', function(req, res, next) {
    Chapter.find(function(err, chapters){
       if (err)  {
           return next(err);
       }
       res.json(chapters);
    })
});

router.post('/create', function(req, res, next){
   var chapter = new Chapter(req.body);
   Category.findOne({_id: chapter.Category}, function(err, category){
       if (err) return next(err);
       if (category === null) {
           var err = 'category is not exist!';
           return res.status(500).json({errmsg: err});
       }
       category.Chapters.push(chapter.Category);
       category.save(function (err, parent){
           if (err) return next(err);
           chapter.save(function (err, u){
               if (err) {
                   return next(err);
               }
               res.json(u);
           })
       })
   })
});

router.post('/:id/delete', function(req, res, next){
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    Chapter.findOne({_id: mid}, function (err, chapter){
        if (err) {
            return next(err);
        }
        if (chapter === null) {
            var err = 'chapter is not exist!';
            return res.status(500).json({errmsg: err});
        }
        Category.findOne({_id: chapter.Category}, function(err, category) {
            if (err) {
                return next(err);
            }
            if (category !== null) {
                var index = category.Chapters.indexOf(chapter._id);
                if(index > -1) {
                    category.Chapters.splice(index,1);
                }
            }
            category.save(function (err, p){
                if (err) {
                    return next(err);
                }
               chapter.remove(function (err, r){
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