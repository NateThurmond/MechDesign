var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Mech Design',
             quote: '"Communication is the key... and the lock... and the door"' });
});

/* GET about page */
router.get('/about', function(req, res, next) {

  res.render('about', { title: 'About Mech Design' });
});

/* GET Design page */
router.get('/design', function(req, res, next) {
    
    var db = req.db;
    var collection = db.get('mechs');
    collection.find({},{},function(e,docs){
        res.render('design', {
            mechlist : docs,
            title: 'Mech Design'
        });
    });
    //res.render('design', { title: 'Mech Design' });
});

/* select a mech */
router.post('/selectmech', function(req, res, next) {
    
    var mechName = req.body.mechSelector;
    
    var db = req.db;
    var collection = db.get('mechs');
    collection.find({mechName: mechName},function(e,docs){
        
        res.render('design_mechview.jade', {
            mech: docs    
        });
    });
});


module.exports = router;
