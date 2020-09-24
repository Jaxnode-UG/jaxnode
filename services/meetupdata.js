'use strict';

//var https = require('https');
//var nextMeeting = '';
const fetch = require('node-fetch');
const cache = require('memory-cache');
const moment = require('moment-timezone');
const nextmeeting = require('../data/nextmeeting.json');

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

/*
 * This is the third method used for retrieving the next meetup. It uses Node 8's async and await syntax.
 */
async function getNextMeetupV3() {
    const meetingCache = cache.get('nextMeeting');
    if (meetingCache) {
        return meetingCache[0];
    } else {
        const response = await fetch('https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key);
        const json = await response.json();
        const meetingArray = json.results;
        setTimeToNewYork(meetingArray);
        cache.put('nextMeeting', meetingArray, 3600000);
        return meetingArray[0];    
    }
}

/*
 * This is the second method used for retrieving the next meetup. It used a Promise.
 */
function getNextMeetupV2() {
    return new Promise((resolve, reject) => {
        const meetingCache = cache.get('nextMeeting');
        if (meetingCache) {
            resolve(meetingCache[0]);
        } else {
            fetch('https://api.meetup.com/2/events?&sign=true&group_id=10250862&page=20&key=' + process.env.meetupapi_key).then(response => {
                return response.json();
            }).then(json => {
                const meetingArray = json.results;
                setTimeToNewYork(meetingArray);
                cache.put('nextMeeting', meetingArray, 3600000);
                resolve(meetingArray[0]);
            }).catch(err => {
                reject(err);
            });
        }
    });
}

/*
 * This is the original method used for retrieving the next meetup. It used a error first callback
 */
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

/*
 * This is the third method used for retrieving the next meetup. It uses Node 8's async and await syntax.
 */
async function getNextMeetupV4() {
    return nextmeeting[0];
}

// module.exports = getNextMeetup;
// module.exports = getNextMeetupV2;
module.exports = getNextMeetupV4;
