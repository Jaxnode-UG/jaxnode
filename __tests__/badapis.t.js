'use strict';
var request = require('supertest');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routesForApis = require('../routes/apiroutes');

var twitterdata = require('../fakes/twitterfake.js');
var meetupdata = require('../fakes/meetuperrorfake.js');
var githubData = require('../fakes/githuberrorfake.js');
var servicefactory = require('../services/jaxnode-service.js');
var service = servicefactory(meetupdata, twitterdata);
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

describe('Bad API Routes', function () {

    beforeEach(() => {
        var exposeService = function (req, resp, next) {
            req.service = service;
            req.getCode = githubData;
            next();
        };

        app.use('/v1/api', exposeService, routesForApis);
    });

    describe('GET Meeting', function () {
        test('responds to /v1/api/meeting', function testApi(done) {
            request(app).get('/v1/api/meeting').then(response => {
                expect(response.header['content-type']).toBe('application/json; charset=utf-8');
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });

    describe('GET Github', function () {
        test('responds to /v1/api/github', function testApi(done) {
            request(app).get('/v1/api/github').then(response => {
                expect(response.header['content-type']).toBe('application/json; charset=utf-8');
                expect(response.statusCode).toBe(500);
                done();
            });
        });
    });

});
