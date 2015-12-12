"use strict";

var MeetupData = function MeetupData() {};

MeetupData.prototype.getNextMeetup = function getNextMeetup(cb) {
	var err = false;
	var results = { utc_offset: -18000000,
				venue: 
				{ country: 'us',
					city: 'Jacksonville',
					address_1: '10752 Deerwood Park Blvd Suite 110,',
					name: 'Availity',
					lon: -81.531815,
					id: 19194672,
					state: 'FL',
					lat: 30.246962,
					repinned: false },
				headcount: 0,
				visibility: 'public',
				waitlist_count: 0,
				created: 1449602582000,
				maybe_rsvp_count: 0,
				description: '<p>React.js is popular JavaScript framework that has really caught fire in the last year. Most developers believe that React.js is a competitor to frameworks like Ember.js, Aurelia and Angular.js.</p> <p>The truth is that you can use React.js with frameworks such as Ember.js and Angular 2. With Angular 2\'s new module system you can use React.js with Angular.</p> <p>We are happy to Michael Snead back to present on this topic. Hope to see you there at the next JaxNode meetup.</p>',
				event_url: 'http://www.meetup.com/Jax-Node-js-UG/events/227297428/',
				yes_rsvp_count: 2,
				name: 'Using React with Angular.js',
				id: '227297428',
				time: 'Jan 21, 2016 6:30 PM',
				updated: 1449681014000,
				group: 
				{ join_mode: 'open',
					created: 1379101145000,
					name: 'Jax Node.js UG',
					group_lon: -81.51000213623047,
					id: 10250862,
					urlname: 'Jax-Node-js-UG',
					group_lat: 30.309999465942383,
					who: 'Noders' },
				status: 'upcoming' 
			};
	 cb(err, results);
};

module.exports = new MeetupData();