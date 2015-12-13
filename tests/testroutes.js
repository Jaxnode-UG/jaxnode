/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";
var sinon = require('sinon');
var chai = require('chai');
var request = require('supertest');
var express = require('express');
var routes = require('../routes');
var contact = require('../routes/contact');
var sponsors = require('../routes/sponsors');
var getApps = require('../routes/appcontroller.js');

var twitterdata = require('../services/twitterfake.js');
var meetupdata = require('../services/meetupfake.js');
var githubData = require('../services/githubfake.js');
var servicefactory = require('../services/jaxnode-service.js');
var service = servicefactory(meetupdata, twitterdata);
var path = require('path');

var expect = chai.expect;


var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

var exposeService = function(req, resp, next){
    req.service = service;
    req.GitHubData = githubData;
    next();
};

app.get('/', exposeService, routes.index);
app.get('/Contact', contact.contact);
app.get('/Sponsors', sponsors.list);
app.get('/Code', exposeService, routes.code);
app.get('/api', exposeService, routes.api);

describe("Routes", function() {
  describe("GET Index", function() {

    it('responds to /', function testHomepage(done) {
      request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
    });
  });
  
  describe('GET Contact Us', function() {
    it('responds to /Contact', function testContactUs(done) {
      var req, res, spy;

        req = res = {};
        spy = res.render = sinon.spy();
        contact.contact(req, res);
        expect(spy.calledOnce).to.equal(true);
        done();
    });
  });
  
  describe('GET Code', function() {
    it('responds to /Code', function testCode(done) {
      this.timeout(10000);
      request(app)
      .get('/Code')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
    });
  });
  
  describe('GET Api', function() {
    this.timeout(10000);
    it('responds to /api', function testApi(done) {
      request(app)
      .get('/api')
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
    });
  });
 
  describe('GET Sponsors', function() {
    it('responds to /Sponsors', function testSponsors(done) {
      var req, res, spy;

        req = res = {};
        spy = res.render = sinon.spy();
        sponsors.list(req, res);
        expect(spy.calledOnce).to.equal(true);
        done();
    });
  });
  
  describe('GET Apps', function() {
    this.timeout(10000);
    it('responds to /Apps', function testApi(done) {
      var req,res,spy;

        req = res = {};
        spy = res.send = sinon.spy();

        getApps(req, res);
        expect(spy.calledOnce).to.equal(true);
        done();
    });
  });
  
});