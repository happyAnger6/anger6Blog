var express = require('express');
var router = express.Router();

var Category = require('../../models/category');

/* GET categories listing. */
router.get('/json', function(req, res, next) {
    Category.find(function(err, categories){
       console.log('aa');
       if (err)  {
           return next(err);
       }
       res.json(categories);
    })
});

module.exports = router;