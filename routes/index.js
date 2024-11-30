var express = require("express");
var router = (module.exports = express.Router());

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index.pug", {
        title: "Mech Design",
        link1class: "linkHighlight",
        quote: "Test Quote",
        welcomeSec: "Welcome, Test User",
    });

    /* TO-DO: REPLACE BELOW WITH ABOVE ONCE YOU IMPLEMENT MONGODB */

    // quotes.getDocCount(function (error, docCount) {
    //     quotes.findRandom(docCount, function (error, doc) {
    //         res.render("index.pug", {
    //             title: "Mech Design",
    //             link1class: "linkHighlight",
    //             quote: doc.quote,
    //             welcomeSec: "Welcome, " + req.cookies.userName,
    //         });
    //     });
    // });
});
