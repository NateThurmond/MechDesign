var express = require('express');
var router = module.exports = express.Router();

/* GET design page. */
router.get('/design', function(req, res) {
    
    mechMod.findAllBaseMechs( function(error, docs) {
        
        mechMod.findAllCustomMechs(req.cookies.userName, function(err, documents) {
            
            if (req.cookies.userName == null) {
                documents = {};
            }
            
            res.render('design.jade', { 
                title: 'Create your mech',
                link2class: "linkHighlight",
                welcomeSec: "Welcome, " + req.cookies.userName,
                mechs: docs,
                customMechs: documents
            }); 
        });
    })
});

/* GET mech for design page. */
router.get('/design/:id', function(req, res) {
    mechMod.findById(req.params.id, function(error,selectedMech) {
        res.json(selectedMech);
    })
});

/* GET mech by name design page. */
router.get('/design/mechName/:mechName', function(req, res) {
    mechMod.findByName(req.params.mechName, function(error,selectedMech) {
        res.json(selectedMech);
    })
});

/* POST new mech for design page. */
router.post('/design/saveNew/', function(req, res) {
    mech = req.body;
    
    mechMod.save(mech, function(error, response) {
        res.json(response);
    })
});

/* POST to delete mech. */
router.post('/design/removeMech/:mechName', function(req, res) {
    
    mechMod.removeMech(req.params.mechName, function(error, response) {
        res.json(response);
    })
});

/* POST save existing mech for design page. */
router.post('/design/save/', function(req, res) {
    mech = req.body;
    
    mechMod.patch(mech, function(error, response) {
        res.json(response);
    })
});

