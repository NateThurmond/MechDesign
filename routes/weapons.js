var express = require("express");
var router = (module.exports = express.Router());

/* GET design page. */
router.get("/", function (req, res) {
    weapons.collection.find({}, {}, function (error, results) {
        if (error) callback(error);
        else res.json(results);
    });
});
