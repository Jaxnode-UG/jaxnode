'use strict';

function Service(meetupdata, twitterdata) {
    return {
        getNextMeetup: meetupdata,
        getTweets: twitterdata
    };
}

module.exports = Service;
