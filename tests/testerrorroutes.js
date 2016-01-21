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

    before(function () {
        var exposeService = function (req, resp, next) {
            req.service = service;
            req.getCode = githubData;
            next();
        };

        app.use('/', exposeService, routes);
        app.use('/apps', routesForApps);
    });

    describe('GET Index', function () {
        it('responds to /', function testHomepage(done) {
            request(app)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(500, done);
        });
    });

    describe('GET Code', function () {
        it('responds to /Code', function testCode(done) {
            this.timeout(10000);
            request(app)
                .get('/Code')
                .expect('Content-Type', /text\/html/)
                .expect(500, done);
        });
    });

    describe('GET Api', function () {
        this.timeout(10000);
        it('responds to /api', function testApi(done) {
            request(app)
                .get('/api')
                .expect('Content-Type', /application\/json/)
                .expect(500, done);
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

});
