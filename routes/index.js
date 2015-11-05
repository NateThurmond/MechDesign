var express = require('express');
var router = module.exports = express.Router();

/* GET home page. */
router.get('/', function(req, res){
    res.render('index.jade', { 
        title: 'Mech Design'
    });
});
