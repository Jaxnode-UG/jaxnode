'use strict';
const express = require('express');
const twitterdata = require('./services/twitterdata.js');
const meetupdata = require('./services/meetupdata.js');
const githubData = require('./services/githubdata.js');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const servicefactory = require('./services/jaxnode-service.js');

const service = servicefactory(meetupdata, twitterdata);

const routes = require('./routes/index');
const routesForApps = require('./routes/appsroutes');
const routesForApis = require('./routes/apiroutes');

const app = express();

// view engine setup
const hbs = require('express-hbs');
require('./services/hbsHelpers.js')(hbs);

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const exposeService = function (req, resp, next) {
    req.service = service;
    req.getCode = githubData;
    next();
};

app.use('/', exposeService, routes);
app.use('/apps', routesForApps);
app.use('/v1/api', exposeService, routesForApis);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404).render('404', { title: '404 Error' });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
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
app.use(function (err, req, res) {
    res.status(err.status || 500);
    console.log(err.message);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
