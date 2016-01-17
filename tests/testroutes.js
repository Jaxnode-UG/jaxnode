'use strict';
var request = require('supertest');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('../routes/index');
var routesForApps = require('../routes/appsroutes');

var twitterdata = require('../fakes/twitterfake.js');
var meetupdata = require('../fakes/meetupfake.js');
var githubData = require('../fakes/githubfake.js');
var servicefactory = require('../services/jaxnode-service.js');
var service = servicefactory(meetupdata, twitterdata);
var path = require('path');

var app = express();
var hbs = require('express-hbs');
var hbsHelpers = require('../services/hbsHelpers.js');
hbsHelpers(hbs);

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
        it('responds to /', function testHomepage(done) {
            request(app)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

    describe('GET Contact Us', function () {
        it('responds to /Contact', function testContactUs(done) {
            request(app)
                .get('/Contact')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

    describe('GET Code', function () {
        it('responds to /Code', function testCode(done) {
            this.timeout(10000);
            request(app)
                .get('/Code')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

    describe('GET Api', function () {
        this.timeout(10000);
        it('responds to /api', function testApi(done) {
            request(app)
                .get('/api')
                .expect('Content-Type', /application\/json/)
                .expect(200, done);
        });
    });

    describe('GET Sponsors', function () {
        it('responds to /Sponsors', function testSponsors(done) {
            request(app)
                .get('/Sponsors')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

    describe('GET Apps', function () {
        it('responds to /Apps', function testApps(done) {
            request(app)
                .get('/apps')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

    describe('GET App JaxNodeNext', function () {
        it('responds to /Apps/JaxNodeNext', function testAppJaxNodeNext(done) {
            request(app)
                .get('/apps/JaxNodeNext')
                .expect('Content-Type', /text\/html/)
                .expect(200, done);
        });
    });

    describe('GET App NonExistent', function () {
        it('responds to /Apps/NonExistent', function testAppJaxNodeNext(done) {
            request(app)
                .get('/apps/NonExistent')
                .expect('Content-Type', /text\/html/)
                .expect(404, done);
        });
    });

});
