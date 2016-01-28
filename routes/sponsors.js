'use strict';

var getSponsors = require('../services/sponsordata');
/*
 * GET Sponsors page.
 */

exports.list = function (req, res) {
    res.render('sponsors', { title: 'Sponsors', sponsors: getSponsors() });
};
