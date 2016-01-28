'use strict';

var twitterfake = require('../fakes/twitterfake.js');
var meetupfake = require('../fakes/meetupfake.js');
var githubdata = require('../fakes/githubfake.js');
var sponsordata = require('../services/sponsordata.js');
var factory = require('../services/jaxnode-service.js');
var servicefake = factory(meetupfake, twitterfake);
var path = require('path');
var appdata = require(path.join(__dirname, '../data/apps.json'));
var chai = require('chai');

var assert = chai.assert;

describe('Services', function () {
    describe('GET Twitter', function () {
        it('Grab twitter feed', function getTweets(done) {
            servicefake.getTweets(function (err, results) {
                if (err) {
                    return done(err);
                }
                assert(results.tweets[0].name === 'jaxnode');
                done();
            });
        });
    });

    describe('GET Meetup', function () {
        it('Grab next meetup', function getNextMeetup(done) {
            servicefake.getNextMeetup(function (err, results) {
                if (err) {
                    return done(err);
                }
                assert(results.id === '227297428');
                done();
            });
        });
    });

    describe('GET GitHub Code', function () {
        it('Grab repos', function getGitHubData(done) {
            githubdata(function (err, results) {
                if (err) {
                    return done(err);
                }
                assert(results.repos[0].name === 'gulptest');
                done();
            });
        });
    });

    describe('GET App data', function () {
        it('Grab data from file', function getDataFromFile(done) {
            var selectedApp = appdata.filter(function (n) {
                return n.title === 'JaxNodeNext';
            });
            if (selectedApp[0] === undefined || selectedApp.length !== 1) {
                done('No results returned');
            } else {
                assert(selectedApp[0].title === 'JaxNodeNext');
                done();
            }
        });
    });

    describe('GET Sponsor data', function () {
        it('Grab sponsor data from service.', function getSponsorData(done) {
            var myData = sponsordata();
            var selectedSponsor = myData.filter(function (n) {
                return n.name === 'Availity';
            });
            if (selectedSponsor[0] === undefined || selectedSponsor.length !== 1) {
                done('No results returned');
            } else {
                assert(selectedSponsor[0].alt === 'Availity');
                done();
            }
        });
    });

});
