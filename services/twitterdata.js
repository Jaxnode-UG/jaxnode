'use strict';

var cache = require('memory-cache');
var twitter = require('twitter');
var async = require('async');

/*
 * Set up options for the Twitter API.
 */
/*eslint-disable */
var twit = new twitter({
    consumer_key: process.env.twitter_ck,
    consumer_secret: process.env.twitter_cs,
    access_token_key: process.env.twitter_atk,
    access_token_secret: process.env.twitter_ats
});
/*eslint-enable */

/*
 * Method used to format Twitter text using Regex.
 */
function gatherTweets(item, callback) {
    var resultText = item.text.replace(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/, '<a href="$1">$1</a>');
    var twitterText = resultText.replace(/@(\w+)/, '<a href="https://twitter.com/$1">@$1</a>');
    callback(null, { text: twitterText, icon: item.user.profile_image_url, name: item.user.screen_name });
}

function getFeed(cb) {
    var cTweets = cache.get('Tweets');
    if (cTweets !== null) {
        cb(null, { tweets: cTweets });
    } else {
        var params = {include_entities: true}; // eslint-disable-line
        twit.get('/statuses/user_timeline', params, function (err, data) {
            async.map(data, gatherTweets, function (err2, results) {
                cache.put('Tweets', results, 3600000);
                cb(null, { tweets: results });
            });
        });
    }
}

module.exports = getFeed;
