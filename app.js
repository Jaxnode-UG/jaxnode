var express = require('express');
var twitterdata = require('./services/twitterdata.js');
var meetupdata = require('./services/meetupdata.js');
var githubData = require('./services/githubdata.js');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var servicefactory = require('./services/jaxnode-service.js');

var service = servicefactory(meetupdata, twitterdata);

var routes = require('./routes/index');

var app = express();

// view engine setup
var hbs = require('express-hbs');

hbs.registerHelper('activeMenu', function(route, name, test, title) {
  if (test === title) {
    return new hbs.SafeString(
        "<li class='active'><a href='" + route + "'>" + name + "</a></li>"
    );    
  } else {
    return new hbs.SafeString(
        "<li><a href='" + route + "'>" + name + "</a></li>"
    );
  }
});

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var exposeService = function(req, resp, next){
    req.service = service;
    req.GitHubData = githubData;
    next();
};

app.use('/', exposeService, routes);

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
    console.log(err.message);
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
  console.log(err.message);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
