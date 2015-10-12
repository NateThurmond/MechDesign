var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var MechMod = require('./mechMod-mongodb').ArticleProvider;

// Database is not set up yet for this site.
 //var mongodb = require("mongodb");
 //var monk = require("monk");
 //var db = monk("localhost:27017/mechDesign");

var app = express();

var routes = require('./routes/routes.js');
var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public/images/site_logo_icon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//// Make DB accessible to our router
//app.use(function(req, res, next) {
//        req.db = db;
//        next();
//});

// GLOBAL Variable. Not best practice but this is used in all routes.
mechMod = new mechMod();

//app.use('/', routes);
//app.use('/about', routes);
//app.use('/design', routes);
//app.use('/selectmech', routes);
//app.use('/design/users', users);

var indexRoutes = require('./routes/index');
//var blogRoutes = require('./routes/blog');

app.use(indexRoutes);
//app.use(blogRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
