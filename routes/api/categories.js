var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Category = require('../../models/category');

/* GET categories listing. */
router.get('/json', function(req, res, next) {
    Category.find(function(err, categories){
       if (err)  {
           return next(err);
       }
       res.json(categories);
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
        if (category == null) {
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
        if (category == null) {
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
            if (parent != null) {
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