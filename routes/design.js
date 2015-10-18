var express = require('express');
var router = module.exports = express.Router();

/* GET home page. */
router.get('/design', function(req, res){
    mechMod.findAll( function(error,docs){
        res.render('design.jade', { 
            title: 'Create your mech',
            mechs:docs
        });
    })
});

/* GET home page. */
router.get('/design/:id', function(req, res){
    mechMod.findById(req.params.id, function(error,selectedMech){
        res.json(selectedMech);
    })
});

