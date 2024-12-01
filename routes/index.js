var express = require("express");
var router = (module.exports = express.Router());

/* GET home page. */
router.get("/", function (req, res) {
    quotes.getDocCount(function (error, docCount) {
        quotes.findRandom(docCount, function (error, doc) {
            res.render("index.pug", {
                title: "Mech Design",
                link1class: "linkHighlight",
                quote: doc.quote,
                /* TO-DO: Still need to fix and implement mongo users */
                // welcomeSec: "Welcome, " + req.cookies.userName,
                welcomeSec: "Welcome, Test User",
            });
        });
    });
});
