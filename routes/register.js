var express = require('express');
var router = module.exports = express.Router();

/* GET registration page. */
router.get('/register', function(req, res){
    
    res.render('register.jade', { 
        title: 'Register new account'
    });
});

/* POST to save new user. */
router.post('/register/register/', function(req, res){
    newUser = req.body;
    
    members.checkForUser(newUser.userName, function(err, userCount) {
        console.log(userCount);
        if (userCount == 0) {
            members.insertUser(newUser, function(error, response){
                res.json(response);
            })
        }
        else {
            res.json("That UserName already exists");
        }
    });
    
    
    //members.insertUser(newUser, function(error, response){
    //    res.json(response);
    //})
});

/* POST to login user. */
router.post('/register/login/', function(req, res) {
    user = req.body;
    
    members.login(user, function(err, response) {
        
        if (response == "Log in successful") {
            res.cookie('userName', user.userName, { maxAge: 14400000, httpOnly: false });
        }
        
        res.json(response);
    });
});

/* POST to login user. */
router.post('/register/logout/', function(req, res) {
    
    res.clearCookie('userName');
    res.json("Logged out");
});
