
var mongodb = require("mongodb");
var monk = require("monk");

quotes = function() {
  this.db = monk(process.env.MONGO_URI);
  this.collection = this.db.get('quotes');
  
  this.setCollection = function(collection) {
        this.collection = this.db.get(collection);
  };
};

quotes.prototype.findAll = function(callback) {
  this.collection.find({},{},function(error,results){
      if( error ) callback(error)
      else callback(null, results)
  });  
};

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


exports.quotes = quotes;
