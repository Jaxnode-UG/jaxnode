
/*
 * GET home page.
 */

var https = require('https'),
	GitHubData = require('../services/githubdata.js'),
	twitterdata = require('../services/twitterdata.js'),
	meetupdata = require('../services/meetupdata.js'),
	servicefactory = require('../services/jaxnode-service.js');
	
var Service = servicefactory(meetupdata, twitterdata); 

/*
 * Render Index with Tweets.
 */
function renderIndexWithTweets(res, meetingArray) {
    Service.getTweets(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.render('index', { title: 'Jax Node User Group', meeting: meetingArray, tweets: results.tweets  });
		}
	});
}

/*
 * Setting up index route.
 */
exports.index = function(req, res) {
	Service.getNextMeetup(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			renderIndexWithTweets(res, results);
		}
	});
};

/*
 * Setting up link to GitHub
 */
exports.code = function(req, res) {
	GitHubData.getCode(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.render('code', { title: 'Jax Node GitHub code', repos: results.repos });
		}
	});
};


/*
 * API Call for next meeting information
 */
exports.api = function(req, res) {
	Service.getNextMeetup(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.send({ meeting: results });	
		}
	});
}