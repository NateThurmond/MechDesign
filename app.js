var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MechMod = require('./mechMod-mongodb').ArticleProvider;
var Quotes = require('./quote-mongodb').ArticleProvider;
var Members = require('./member-mongodb').ArticleProvider;
var Crypto = require('./crypto').ArticleProvider;
var livereload = require('express-livereload');


var app = express();
livereload(app, config={watchDir: "/var/www/MechDesign/"});

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

// GLOBAL Variable. Not best practice but this is used in all routes.
mechMod = new mechMod();
quotes = new quotes();
members = new members();
cryptoHash = new cryptoHash();

var indexRoutes = require('./routes/index');
var designRoutes = require('./routes/design');
var registerRoutes = require('./routes/register');

app.use(indexRoutes);
app.use(designRoutes);
app.use(registerRoutes);

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
