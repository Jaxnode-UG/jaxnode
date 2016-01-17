'use strict';

var https = require('https');
var nextMeeting = '';
var cache = require('memory-cache');
var moment = require('moment-timezone');

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
 * This function always sets the meeting to the correct time.
 */
function setTimeToNewYork(meetingArray) {
    if (meetingArray && meetingArray.length > 0) {
        var currTime = moment(meetingArray[0].time).utc().clone();
        meetingArray[0].time = currTime.tz('America/New_York').format('lll');
    }
}

function getNextMeetup(cb) {
    var sreq = https.request(httpsOptions, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            nextMeeting += chunk;
        });
        response.on('end', function () {
            var err = false;
            if (nextMeeting && nextMeeting.toString().slice(0, 6) !== '<html>') {
                var meetingObject = JSON.parse(nextMeeting);
                var meetingArray = meetingObject.results;
                // permanent fix for the changing timezone plus moment deprecation fix.
                setTimeToNewYork(meetingArray);
                cache.put('nextMeeting', meetingArray, 3600000);
                nextMeeting = '';
                cb(err, meetingArray[0]);
            } else {
                var meetingObject2 = {};
                meetingObject2.results = [{}];
                cb(err, meetingObject2.results[0]);
            }
        });
    });
    sreq.on('error', function (e) {
        console.log('problem with request: ' + e.message);
        var meetingObject3 = {};
        meetingObject3.results = [{}];
        cb(e, meetingObject3.results[0]);
    });
    sreq.write('data\n');
    sreq.end();
}

module.exports = getNextMeetup;
