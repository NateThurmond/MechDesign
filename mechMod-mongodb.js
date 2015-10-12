
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
  this.collection.find({},{},function(error,results){
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

mechMod.prototype.save = function(mechs, callback) {
  if( typeof(mechs.length)=="undefined")
    mechs = [mechs];

  for( var i =0;i< mechs.length;i++ ) {
    mechs = mechs[i];
    mechs.created_at = new Date();
    if( mechs.comments === undefined ) mechs.comments = [];
    for(var j =0;j< mechs.comments.length; j++) {
      mechs.comments[j].created_at = new Date();
    }
  }

  this.collection.insert(mechs, function() {
    callback(null, mechs);
  });
};

//mechMod.prototype.addCommentToArticle = function(articleId, comment, callback) {
//  this.collection.update(
//    {_id: articleId},
//    {"$push": {comments: comment}},
//    function(error, article){
//      if( error ) callback(error);
//      else callback(null, article)
//  });
//};

exports.mechMod = mechMod;