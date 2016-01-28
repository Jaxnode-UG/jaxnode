'use strict';

var path = require('path');
var sponsorlist = require(path.join(__dirname, '../data/sponsors.json'));

function getSponsors() {
    return sponsorlist;
}

module.exports = getSponsors;
