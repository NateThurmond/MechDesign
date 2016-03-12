
var mongodb = require("mongodb");
var monk = require("monk");

mechMod = function() {
  this.db = monk("localhost:27017/mechDesign");
  this.collection = this.db.get('mechs');
  
  this.setCollection = function(collection) {
      this.collection = this.db.get(collection);
  };
};

mechMod.prototype.findAll = function(callback) {
  this.collection.find({},{},function(error,results) {
      if( error ) callback(error)
      else callback(null, results)
  });  
};

mechMod.prototype.findById = function(id, callback) {
    this.collection.findOne({_id: id}, function(error, result) {
      if( error ) callback(error)
      else callback(null, result)
    });
};

mechMod.prototype.findByName = function(name, callback) {
    this.collection.findOne({mechName: name}, function(error, result) {
      if( error ) callback(error)
      else callback(null, result)
    });
};

mechMod.prototype.removeMech = function(mechID, callback) {
    this.collection.remove({_id: mechID}, function(error, result) {
      if( error ) callback(error)
      else callback(null, "Mech Deleted")
    });
};

mechMod.prototype.save = function(mech, callback) {
  if( mech == null) {
    console.log('error: no mech data sent to mechMod.save');
    callback(null, "Error saving mech");
  }
  else {
    createDate = new Date();
    result = JSON.stringify(createDate);
    mech.created_on = result.substring(1, result.length-1);
    delete mech["_id"];
    this.collection.insert(mech, function() {
      callback(null, "Created new mech");
    });
  }
};

mechMod.prototype.patch = function(mech, callback) {
  if( mech == null) {
    console.log('error: no mech data sent to mechMod.patch');
    callback(null, "Error saving mech");
  }
  else {
    
    this.collection.update(
      {_id: mech._id},
      {weight: mech.weight,
       speed: mech.speed,
       mechName: mech.mechName},
      function(error, mech){
        if( error ) callback(error);
        else callback(null, "Mech Details Saved")
    });
  }
};

exports.mechMod = mechMod;