var express = require('express');
var router = express.Router();

var Category = require('../../models/category');

/* GET categories listing. */
router.get('/json', function(req, res, next) {
    Cranch.find(function(err, categories){
       if (err)  {
           return next(err);
       }
       res.json(categories);
    })
});