var express = require('express');
var router = module.exports = express.Router();

/* GET home page. */
router.get('/', function(req, res){
    
    quotes.getDocCount( function(error, docCount) {
        quotes.findRandom(docCount, function(error,doc){
            
            res.render('index.jade', { 
                title: 'Mech Design',
                quote:doc.quote
            });
        })    
    });
});
