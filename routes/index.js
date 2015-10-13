var express = require('express');
var router = module.exports = express.Router();

/* GET home page. */
router.get('/', function(req, res){
    mechMod.findAll( function(error,docs){
        res.render('index.jade', { 
            title: 'Mech Design',
            mechs:docs
        });
    })
});