'use strict';
var request = require('supertest');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('../routes/index');

var twittererrordata = require('../fakes/twittererrorfake.js');
var meetupfake = require('../fakes/meetupfake.js');
var githubData = require('../fakes/githuberrorfake.js');
var servicefactory = require('../services/jaxnode-service.js');
var service = servicefactory(meetupfake, twittererrordata);
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

describe('Routes with bad Twitter', function () {

    beforeEach(() => {
        var exposeService2 = function (req, resp, next) {
            req.service = service;
            req.getCode = githubData;
            next();
        };

        app.use('/', exposeService2, routes);
    });

    describe('GET Index', function () {
        test('responds to /', function testHomepage(done) {
            request(app).get('/').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });

});
