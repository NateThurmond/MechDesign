var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
require("./mechMod-mongodb").ArticleProvider;
require("./quote-mongodb").ArticleProvider;
require("./member-mongodb").ArticleProvider;
require("./weapons-mongodb").ArticleProvider;
require("./crypto").ArticleProvider;

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(favicon(path.join(__dirname, "public/images/site_logo_icon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// GLOBAL Variable. Not best practice but this is used in all routes.
mechMod = new mechMod();
quotes = new quotes();
members = new members();
weapons = new weapons();
cryptoHash = new cryptoHash();

var indexRoutes = require("./routes/index");
var designRoutes = require("./routes/design");
var registerRoutes = require("./routes/register");
var weaponsRoutes = require("./routes/weapons");

app.use("/", indexRoutes);
app.use("/design", designRoutes);
app.use("/register", registerRoutes);
app.use("/weapons", weaponsRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err,
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {},
    });
});

module.exports = app;
