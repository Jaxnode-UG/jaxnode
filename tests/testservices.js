/// <reference path="../typings/mocha/mocha.d.ts"/>
"use strict";

var twitterfake = require('../services/twitterfake.js');
var meetupfake = require('../services/meetupfake.js');
var githubdata = require('../services/githubfake.js');
var factory = require('../services/jaxnode-service.js');
var servicefake = factory(meetupfake, twitterfake);
var path = require('path'); 
var appdata = require(path.join(__dirname, '../data/apps.json'));
var mocha = require('mocha');
var chai = require('chai');

var assert = chai.assert;

describe("Services", function() {
  describe("GET Twitter", function() {
  	it('Grab twitter feed', function getTweets(done) {
      servicefake.getTweets(function (err, results) {
        if (err) return done(err);
        assert('jaxnode' === results.tweets[0].name);
        done();
      });
    });
  });
  
  describe("GET Meetup", function() {
  	it('Grab next meetup', function getNextMeetup(done) {
      servicefake.getNextMeetup(function (err, results) {
        if (err) return done(err)
        assert('227297428' === results.id);
        done();
      });
    });
  });
  
  describe("GET GitHub Code", function() {
  	it('Grab repos', function getGitHubData(done) {
      githubdata.getCode(function (err, results) {
        if (err) return done(err)
        assert('gulptest' === results.repos[0].name);
        //console.log(results.repos[0].name);
        done();
      });
    });
  });
  
  describe("GET App data", function() {
  	it('Grab data from file', function getDataFromFile(done) {
      var selectedApp = appdata.filter(n => n.title === 'JaxNodeNext');
      if (selectedApp[0] === undefined || selectedApp.length !== 1) {
          done('No results returned');
      } else {
          assert(selectedApp[0].title === 'JaxNodeNext');
          done();
      }
    });
  });
  
});