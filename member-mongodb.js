var mongodb = require("mongodb");
var monk = require("monk");

members = function() {
  this.db = monk("localhost:27017/mechDesign");
  this.collection = this.db.get('members');
  
  this.setCollection = function(collection) {
      this.collection = this.db.get(collection);
  };
};


members.prototype.insertUser = function(newUser, callback) {
  
  // Example Usage for generating password hashed and salted
  cryptoHash.hashPassword(newUser.userPass, function(err, resp) {
    
      newUser.userPass = resp.toString('hex');
      delete newUser.userPassConfirm;
      
      members.collection.insert(newUser, function(error,results) {
        
          if( error ) callback(error)
          else callback(null, "Registration Successful")
      });  
  });
};

members.prototype.login = function(user, callback) {
  this.collection.find({"userName" : user.userName}, function(err, userFound) {
      
      if (userFound.length == 0) {
          callback(null, "User not found");
      }
      else {
          var bytes = [], str;
          
          for(var i=0; i< userFound[0].userPass.length-1; i+=2){
              bytes.push(parseInt(userFound[0].userPass.substr(i, 2), 16));
          }
          
          str = String.fromCharCode.apply(String, bytes);
          
          var responseData = str.toString("binary");
          var combined = new Buffer(responseData, "binary");

          cryptoHash.verifyPassword(user.userPass, combined, function(err, response) {
              // Boolean response of verifying password
              if (response) {
                  callback(null, "Log in successful");
              }
              else {
                  callback(null, "Password incorrect");
              }
          });
      }
  });
};

members.prototype.checkForUser = function(userName, callback) {
  this.collection.count({"userName" : userName}, function(err, userCount) {
    
      if( err ) callback(err)
      else callback(null, userCount)
  });
};

/*
quotes.prototype.getDocCount = function(callback) {
    var randomQuoteNum = 0;
  
    this.collection.count({}, function(err, count) {
        randomQuoteNum = Math.floor(Math.random() * count);
      
        if( err ) callback(err)
        else callback(null, randomQuoteNum.toString())
    });
};

quotes.prototype.findRandom = function(docIndex, callback) {

    this.collection.findOne({docNum: docIndex}, function(error, result) {
      if( error ) callback(error)
      else callback(null, result)
    });
};

quotes.prototype.findById = function(id, callback) {
    this.collection.findOne({_id: id}, function(error, result) {
      if( error ) callback(error)
      else callback(null, result)
    });
};

quotes.prototype.findByName = function(name, callback) {
    this.collection.findOne({mechName: name}, function(error, result) {
      if( error ) callback(error)
      else callback(null, result)
    });
};

*/

exports.members = members;