"use strict";
/*
 * GET home page.
 */

exports.index = function index(req, res) {
	req.service.getNextMeetup(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			var meetingArray = results;
			req.service.getTweets(function callback(err, tweetResults) {
				if (err) {
					console.log('problem with request: ' + err);
				} else {
                    var displayMeetup = Object.keys(meetingArray).length !== 0;
                    var displayTweets = tweetResults.tweets.length !== 0;
                    console.log(displayMeetup);
					res.render('index', { title: 'JaxNode User Group', meeting: meetingArray, tweets: tweetResults.tweets, displayMeetup: displayMeetup, displayTweets: displayTweets  });
				}
			});
		}
	});
};

exports.code = function code(req, res) {
	req.GitHubData.getCode(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.render('code', { title: 'Jax Node GitHub code', repos: results.repos });
		}
	});
};

exports.api = function api(req, res) {
	//console.log(req.service);	
	req.service.getNextMeetup(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.send({ meeting: results });	
		}
	});
};