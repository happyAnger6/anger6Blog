var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../../models/category');
var Chapter = require('../../models/chapter');
var Section = require('../../models/section');

/* GET categories listing. */
router.get('/json', function(req, res, next) {
    Category.find(function(err, categories){
       if (err)  {
           return next(err);
       }
       res.json(categories);
    })
});

function getNextSections(i, sectionsIDs, len, j, chaptersIDs, clen, retChapters, res, next) {
    if (i < len) {
        var sID = sectionsIDs[i];
        Section.findOne({_id: mongoose.Types.ObjectId(sID)}, function(err, s){
            if (err) {
                return next(err);
            }
            //console.log("spush:", i, s, sectionsIDs.length);
            retChapters[j].Sections.push(s);
            i++;
            getNextSections(i, sectionsIDs, len, j, chaptersIDs, clen, retChapters, res, next);
        })
    }
    else {
       j++;
       getNextChapter(j, chaptersIDs, clen, retChapters, res, next)
    }
}

function getNextChapter(i, chaptersIDs, len, retChapters,  res, next)
{
   if (i < len) {
       var cID = chaptersIDs[i];
       Chapter.findOne({_id: mongoose.Types.ObjectId(cID)}, function(err, c){
           if (err) {
               return next(err);
           }
           //console.log("push", i, c);
           retChapters.push({_id: c._id, Name: c.Name, Num: c.Num, Category: c.Category, Sections: [], Flag: c.Flag});
           getNextSections(0, c.Sections, c.Sections.length, i, chaptersIDs, chaptersIDs.length, retChapters, res, next);
       });
   }
   else {
       res.json(retChapters);
   }
}

router.get('/chapters', function(req, res, next) {
    var name = req.query.name;
    var chapters = new Array();
    var errFlag = 0;
    Category.findOne({Name: name}, function(err, category){
        if (err)  {
            return next(err);
        }
        getNextChapter(0, category.Chapters, category.Chapters.length, chapters, res, next);
    })
});

router.get('/:id/chapters', function(req, res, next) {
    var _id = req.params.id;
    var mid = mongoose.Types.ObjectId(_id);
    var chapters = new Array();
    var errFlag = 0;
    Category.findOne({_id: mid}, function(err, category){
        if (err)  {
            return next(err);
        }
        getNextChapter(0, category.Chapters, category.Chapters.length, chapters, res, next);
    })
});

router.post('/create', function(req, res, next){
    var category = new Category(req.body);
    if (category.ParentName) {
       Category.findOne({Name: category.ParentName}, function(err, parent){
           if (err) return next(err);
           if (parent == null) {
               parent = new Category({Name:'根', ParentName:'-1', ChildrenNames:[]});
           }
           parent.ChildrenNames.push(category.Name);
           parent.save(function (err, parent){
               if (err) return next(err);
               category.save(function (err, u){
                   if (err) {
                       return next(err);
                   }
                   res.json(u);
               })
           })
       })
    }
    else {
        category.save(function (err, u) {
            if (err) {
                return next(err);
            }
            res.json(u);
        })
    }
});

router.post('/:id/update', function(req, res, next){
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    var update_category = new Category(req.body);
    Category.findOne({_id: mid}, function (err, category){
        if (err) {
            return next(err);
        }
        if (category === null) {
            var err = 'category is not exist!';
            return res.status(500).json({errmsg: err});
        }
        if (category.Name === '根') {
            var err = 'category 根 can not be update!';
            return res.status(500).json({errmsg: err});
        }
        Category.findOne({Name: category.ParentName}, function(err, parent) {
            if (err) return next(err);
            if (parent != null) {
                var index = parent.ChildrenNames.indexOf(category.Name);
                if(index > -1) {
                    parent.ChildrenNames.splice(index,1);
                }
                parent.ChildrenNames.push(update_category.Name);
            }
            parent.save(function (err, p){
                if (err) {
                    return next(err);
                }
                category.Name = update_category.Name;
                category.Type = update_category.Type;
                category.save(function (err, u) {
                    if (err) {
                        return next(err);
                    }
                    res.json(u);
                });
            })
        });
    });
});

router.post('/:id/delete', function(req, res, next){
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    Category.findOne({_id: mid}, function (err, category){
        if (err) {
            return next(err);
        }
        if (category === null) {
            var err = 'category is not exist!';
            return res.status(500).json({errmsg: err});
        }
        if (category.Name === '根') {
            var err = 'category 根 can not be remove!';
            return res.status(500).json({errmsg: err});
        }
        Category.findOne({Name: category.ParentName}, function(err, parent) {
            if (err) {
                return next(err);
            }
            if (parent !== null) {
                var index = parent.ChildrenNames.indexOf(category.Name);
                if(index > -1) {
                    parent.ChildrenNames.splice(index,1);
                }
            }
            parent.save(function (err, p){
                if (err) {
                    return next(err);
                }
               category.remove(function (err, r){
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