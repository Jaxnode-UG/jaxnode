"use strict";

// TODO: modurualize the data to make the testing faster
var Service = function Service(meetupdata, twitterdata) {
	this.Meetup = meetupdata;
	this.Twitter = twitterdata;
}

Service.prototype.getNextMeetup = function getNextMeetup(cb) {
	this.Meetup.getNextMeetup(cb);
};

Service.prototype.getTweets = function getTweets(cb) {
	this.Twitter.getFeed(cb);
};

function create(meetupdata, twitterdata) {
	return new Service(meetupdata, twitterdata); 
}

module.exports = create;