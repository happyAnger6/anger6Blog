var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var page = require('../../lib/middlwares/page');

var Article = require('../../models/article');

/* GET categories listing. */
router.get('/json', function(req, res, next) {
    if(req.query && req.query.category) {
        if(req.query.chapter && req.query.section) {
            var chapter = Number(req.query.chapter);
            var section = Number(req.query.section);
            Article.find({Category: req.query.category, Chapter: chapter, Section: section}).sort({PublishDate: 1})
                .exec(function(err, articles){
                    if (err) {
                        return next(err);
                    }
                    res.json(articles);
                 });
        }
        else {
            Article.find({Category: req.query.category}).sort({PublishDate: 1})
                .exec(function(err, articles){
                    if (err) {
                        return next(err);
                    }
                    req.totals = articles;
                    next();
                    //res.json(articles);
                });
        }
    }
    else {
        console.log("all");
        Article.find().sort({PublistDate: 1})
            .exec(function(err, articles){
                if (err) {
                    return next(err);
                }
                req.totals = articles;
                next();
            });
    }
}, page(5));

router.get('/:id/json', function(req, res, next) {
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    Article.findOne({_id: mid}, function (err, art) {
        if (err) {
            return next(err);
        }

        if (art === null) {
            var err = 'article is not exist!';
            return res.status(500).json({errmsg: err});
        }
        else {
                res.json(art);
        }
    });
});

router.post('/create', function(req, res, next) {
    var req_article = new Article(req.body);
    var chapter = req_article.Chapter;
    var section = req_article.Section;

    Article.findOne({Title: req_article.Title, Category: req_article.Category, Chapter: chapter, Section: section},
        function(err, art){
            if(art === null) {
                req_article.save(function (err, u) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        res.json(u);
                    }
                })
            }
            else {
                art.Content = req_article.Content;
                art.PublishDate = Date.now();
                art.save(function (err, u) {
                    if (err) {
                        return next(err);
                    }
                    else {
                        res.json(u);
                    }
                })
            }
        })
});

router.post('/:id/update', function(req, res, next) {
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    var req_article = new Article(req.body);
    Article.findOne({_id: mid}, function (err, art) {
        if (err) {
            return next(err);
        }

        if (art == null) {
            var err = 'article is not exist!';
            return res.status(500).json({errmsg: err});
        }
        else {
            art.Title = req_article.Title;
            art.Content = req_article.Content;
            art.Category = req_article.Category;
            art.PublishDate = Date.now();
        }

        art.save(function (err, u) {
            if (err) {
                return next(err);
            }
            else {
                res.json(u);
            }
        })
    })
});

router.post('/:id/likes', function(req, res, next) {
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    Article.findOne({_id: mid}, function (err, art) {
        if (err) {
            return next(err);
        }

        if (art == null) {
            var err = 'article is not exist!';
            return res.status(500).json({errmsg: err});
        }
        else {
            art.Likes++;
        }

        art.save(function (err, u) {
            if (err) {
                return next(err);
            }
            else {
                res.json(u);
            }
        })
    })
});

router.post('/:id/unlikes', function(req, res, next) {
    id = req.params.id;
    var mid = mongoose.Types.ObjectId(id);
    Article.findOne({_id: mid}, function (err, art) {
        if (err) {
            return next(err);
        }

        if (art == null) {
            var err = 'article is not exist!';
            return res.status(500).json({errmsg: err});
        }
        else {
            art.UnLikes++;
        }

        art.save(function (err, u) {
            if (err) {
                return next(err);
            }
            else {
                res.json(u);
            }
        })
    })
});

module.exports = router;