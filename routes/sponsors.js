'use strict';
/*
 * GET Sponsors page.
 */

exports.list = function (req, res) {
    res.render('sponsors', { title: 'Sponsors' });
};
