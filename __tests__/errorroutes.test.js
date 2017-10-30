'use strict';
var request = require('supertest');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('../routes/index');
var routesForApps = require('../routes/appsroutes');

var twitterdata = require('../fakes/twittererrorfake.js');
var meetuperrordata = require('../fakes/meetuperrorfake.js');
var githubData = require('../fakes/githuberrorfake.js');
var servicefactory = require('../services/jaxnode-service.js');
var service = servicefactory(meetuperrordata, twitterdata);
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

describe('Routes with bad data', function () {
    
    beforeEach(() => {
        var exposeService = function (req, resp, next) {
            req.service = service;
            req.getCode = githubData;
            next();
        };

        app.use('/', exposeService, routes);
        app.use('/apps', routesForApps);
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

    describe('GET Code', function () {
        test('responds to /Code', function testCode(done) {
            request(app).get('/Code').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });

    describe('GET Api', function () {
        test('responds to /api', function testApi(done) {
            request(app).get('/api').then(response => {
                expect(response.header['content-type']).toBe('application/json; charset=utf-8');
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });

    describe('GET Apps', function () {
        test('responds to /Apps', function testApps(done) {
            request(app).get('/apps').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

});