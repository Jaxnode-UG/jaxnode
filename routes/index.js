
/*
 * GET home page.
 */

var https = require('https'),
	nextMeeting = "",
	cache = require('memory-cache'),
    util = require('util'),
    twitter = require('twitter'),
    async = require('async'),
	moment = require('moment-timezone');

/*
 * Set up http options for the Meetup API.
 */
var httpsOptions = {
	hostname: 'api.meetup.com',
	port: 443,
	path: '/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key,
	method: 'GET'
};

/*
 * Set up GitHub http options for the GitHub API.
 */
var gitHubOptions = {
	hostname: 'api.github.com',
	port: 443,
	path: '/users/jaxnode/repos',
	method: 'GET',
	headers: {
		'Accept': 'application/vnd.github.v3+json',
		'User-Agent': 'JaxNode'
	}
};

/*
 * Set up options for the Twitter API.
 */
var twit = new twitter({
    consumer_key: process.env.twitter_ck,
    consumer_secret: process.env.twitter_cs,
    access_token_key: process.env.twitter_atk,
    access_token_secret: process.env.twitter_ats
});

/*
 * Render Index with Tweets.
 */
function renderIndexWithTweets(res, meetingArray)
{
    var cTweets = cache.get('Tweets');
    if (cTweets !== null)
    {
        res.render('index', { title: 'Jax Node User Group', meetingArray: meetingArray, tweets: cTweets  });
    } else {
        twit.get('/statuses/user_timeline.json', {include_entities:true}, function(data) {
            async.map(data, gatherTweets, function(err, results) {
                cache.put('Tweets', results, 3600000);
                res.render('index', { title: 'Jax Node User Group', meetingArray: meetingArray, tweets: results  });
            });
        });
    }
}

/*
 * Method used to format Twitter text using Regex.
 */
function gatherTweets(item, callback) {
    var resultText = item.text.replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, '<a href="$1">$1</a>');
    var twitterText = resultText.replace(/@(\w+)/, '<a href="https://twitter.com/$1">@$1</a>');
    callback(null, { text: twitterText, icon: item.user.profile_image_url, name: item.user.screen_name });
}

/*
 * This function always sets the meeting to the correct time.
 */
function setTimeToNewYork(meetingArray) {
	if (meetingArray && meetingArray.length > 0) {
		console.log(meetingArray[0].time);
		var currTime = moment(meetingArray[0].time).utc().clone();
		meetingArray[0].time = currTime.tz("America/New_York").format("lll");	
	}
}

/*
 * Setting up index route.
 */
exports.index = function(req, res) {
	var cMeetings = cache.get('nextMeeting');
	if (typeof cMeetings !== 'undefined' && cMeetings !== null)
	{
        renderIndexWithTweets(res, cMeetings);
	} else {
		var sreq = https.request(httpsOptions, function (response) {
			response.setEncoding('utf8');
			response.on('data', function (chunk) {
				console.log('receiving data.');
				nextMeeting += chunk;
			});
			response.on('end', function() {
				console.log('request has ended.');
				if (nextMeeting && nextMeeting.toString().slice(0,6) !== "<html>")
				{
					var meetingObject = JSON.parse(nextMeeting);
					var meetingArray = meetingObject.results;
					// permanent fix for the changing timezone plus moment deprecation fix.
					setTimeToNewYork(meetingArray);
					cache.put('nextMeeting', meetingArray, 3600000);
					nextMeeting = "";
					renderIndexWithTweets(res, meetingArray);
				} else {
					var meetingObject = {};
					meetingObject.results = [];
					renderIndexWithTweets(res, meetingObject.results);
				}
			});
		});
		sreq.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		sreq.write('data\n');
		sreq.end();
	}
};

/*
 * Setting up link to GitHub
 */
exports.code = function(req, res) {
	var reposText = "";
	var githubReq = https.request(gitHubOptions, function(response) {
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			//console.log('receiving data.');
			reposText += chunk;
		});
		response.on('end', function() {
			console.log('request has ended.');
			//console.log(reposText);
			var reposArray =  JSON.parse(reposText);
			//console.log(reposArray);
			//, repos: reposArray 
			res.render('code', { title: 'Jax Node GitHub code', repos: reposArray });		
		});
	});
	githubReq.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	githubReq.write('data\n');
	githubReq.end();
};

/*
  each repo in repos
    -if (repo.name.length > 0)
      p= repo.name
    -if (repo.html_url.length > 0)
      p= repo.html_url
*/

/*
 * API Call for next meeting information
 */
exports.api = function(req, res) {
	var cMeetings = cache.get('nextMeeting');
	if (typeof cMeetings !== 'undefined' && cMeetings !== null)
	{
		res.send({ meeting: cMeetings[0] });
	} else {
		var sreq = https.request(httpsOptions, function (response) {
			response.setEncoding('utf8');
			response.on('data', function (chunk) {
				console.log('receiving data.');
				nextMeeting += chunk;
			});
			response.on('end', function() {
				console.log('request has ended.');
				if (nextMeeting && nextMeeting.toString().slice(0,6) !== "<html>")
				{
					var meetingObject = JSON.parse(nextMeeting);
					var meetingArray = meetingObject.results;
					setTimeToNewYork(meetingArray);
					cache.put('nextMeeting', meetingArray, 3600000);
					nextMeeting = "";
					console.log(meetingArray);
					if (typeof meetingArray !== 'undefined') {
						res.send({ meeting: meetingArray[0] });	
					} else {
						res.send({ meeting: {} });	
					}
				} else {
					res.send({ meeting: {} });
				}
			});
		});
		sreq.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		sreq.write('data\n');
		sreq.end();
	}
}