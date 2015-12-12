/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";
var sinon = require('sinon');
var chai = require('chai');
var request = require('supertest');
var express = require('express');
var routes = require('../routes');
var contact = require('../routes/contact');
var sponsors = require('../routes/sponsors');
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

app.get('/', routes.index);
app.get('/Contact', contact.contact);
app.get('/Sponsors', sponsors.list);
app.get('/Code', routes.code);
app.get('/api', routes.api);

describe("Routes", function() {
  describe("GET Index", function() {

    it('responds to /', function testHomepage(done) {
      this.timeout(10000);
        request(app)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .end(function(err, res){
            done(err);
          });
    });
  });
  
  describe('GET Sponsors', function() {
    it('responds to /Sponsors', function testSponsors(done) {
      request(app)
      .get('/Sponsors')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
    });
  });
  
  describe('GET Contact Us', function() {
    it('responds to /Contact', function testContactUs(done) {
      request(app)
      .get('/Contact')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
    });
  });
  
  describe('GET Code', function() {
    it('responds to /Code', function testCode(done) {
      request(app)
      .get('/Code')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
    });
  });
  
  describe('GET Code', function() {
    this.timeout(10000);
    it('responds to /api', function testApi(done) {
      request(app)
      .get('/api')
      .expect('Content-Type', /application\/json/)
      .expect(200, done);
    });
  });
});