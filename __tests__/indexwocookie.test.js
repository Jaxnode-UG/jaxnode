'use strict';
var request = require('supertest');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('../routes/index');
var routesForApps = require('../routes/appsroutes');

var twitterdata = require('../fakes/twitterfake.js');
var meetupdata = require('../fakes/meetupfakenovenue.js');
var githubData = require('../fakes/githubfake.js');
var servicefactory = require('../services/jaxnode-service.js');
var service = servicefactory(meetupdata, twitterdata);
var path = require('path');

var app = express();
var hbs = require('express-hbs');
require('../services/hbsHelpers.js')(hbs);

app.set('port', process.env.PORT || 3000);
app.engine('hbs', hbs.express4());
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var exposeService = function (req, resp, next) {
    req.service = service;
    req.getCode = githubData;
    next();
};

var testCookie = function (req, resp, next) {
    req.cookies.doCodeOnTheBeachOnlyOnce = 'false';
    next();
};

app.use('/', exposeService, testCookie, routes);
app.use('/apps', routesForApps);

describe('Routes', function () {

    describe('GET Index', function () {
        test('responds to /', function testHomepage(done) {
            request(app).get('/').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

});
