'use strict';
var request = require('supertest');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('../routes/index');
var indexRouteFunctions = require('../routes/index-route-functions');
var routesForApps = require('../routes/appsroutes');

var twitterdata = require('../fakes/twitterfake.js');
var meetupdata = require('../fakes/meetupfake.js');
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

app.use('/', exposeService, routes);
app.use('/apps', routesForApps);

describe('Routes', function () {
    
    describe('GET Index', function () {
        test('responds to /', function testHomepage(done) {
            request(app).get('/').then((response) => {
                //expect('Content-Type', /text\/html/);
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    describe('GET Contact Us', function () {
        test('responds to /Contact', function testContactUs(done) {
            request(app).get('/Contact').then((response) => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    describe('GET Code', function () {
        test('responds to /Code', function testCode(done) {
            request(app).get('/Code').then((response) => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    describe('GET Code with Page', function () {
        test('responds to /Code/0', function testCode(done) {
            request(app).get('/Code/0').then((response) => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    describe('GET Code with Page', function () {
        test('responds to /Code/1', function testCode(done) {
            request(app).get('/Code/1').then((response) => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    describe('GET Api', function () {
        test('responds to /api', function testApi(done) {
            request(app).get('/api').then(response => {
                expect(response.header['content-type']).toBe('application/json; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET Sponsors', function () {
        test('responds to /Sponsors', function testSponsors(done) {
            request(app).get('/Sponsors').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
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

    describe('GET App JaxNodeNext', function () {
        test('responds to /Apps/JaxNodeNext', function testAppJaxNodeNext(done) {
            request(app).get('/apps/JaxNodeNext').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET Privacy Policy', function () {
        test('responds to /privacy', function testPrivacy(done) {
            request(app).get('/privacy').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET Terms and Conditions', function () {
        test('responds to /terms', function testTerms(done) {
            request(app).get('/terms').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
    
    describe('GET App NonExistent', function () {
        test('responds to /Apps/NonExistent', function testAppJaxNodeNext(done) {
            request(app).get('/apps/NonExistent').then(response => {
                expect(response.header['content-type']).toBe('text/html; charset=utf-8');
                expect(response.statusCode).toBe(404);
                done();
            });
        });
    });

    describe('test Route Function for compare:', function () {
        test('Test all of the compare options', function testAllCompareOptions(done) {
            const myArray = [
                {
                    name: 'bad',
                    age: 2
                },
                {
                    name: 'air',
                    age: 20
                },
                {
                    name: 'car',
                    age: 1
                },
                {
                    name: 'car',
                    age: 5
                }
            ];
            const sortedArray = myArray.sort(indexRouteFunctions.nameCompare);
            expect(sortedArray[0].name).toBe('air');
            done();
        });
    });
    
});