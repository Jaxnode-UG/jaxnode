"use strict";
/*
 * GET home page.
 */

var IndexRouter = function IndexRouter() { };

IndexRouter.prototype.index = function index(req, res) {
	req.service.getNextMeetup(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			var meetingArray = results;
			req.service.getTweets(function callback(err, tweetResults) {
				if (err) {
					console.log('problem with request: ' + err);
				} else {
					res.render('index', { title: 'JaxNode User Group', meeting: meetingArray, tweets: tweetResults.tweets  });
				}
			});
		}
	});
};

IndexRouter.prototype.code = function code(req, res) {
	req.GitHubData.getCode(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.render('code', { title: 'Jax Node GitHub code', repos: results.repos });
		}
	});
};

IndexRouter.prototype.api = function api(req, res) {
	//console.log(req.service);	
	req.service.getNextMeetup(function callback(err, results) {
		if (err) {
			console.log('problem with request: ' + err);
		} else {
			res.send({ meeting: results });	
		}
	});
};

module.exports = new IndexRouter();