var mongodb = require("mongodb");
var monk = require("monk");

weapons = function () {
    this.db = monk(process.env.MONGO_URI);
    this.collection = this.db.get("weapons");

    this.setCollection = function (collection) {
        this.collection = this.db.get(collection);
    };
};

exports.weapons = weapons;
