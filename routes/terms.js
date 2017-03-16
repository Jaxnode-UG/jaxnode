'use strict';
/*
 * GET Terms page.
 */
function terms(req, res) {
    res.render('terms', { title: 'Terms and Conditions' });
}

/*
 * GET Privacy page.
 */
function privacy(req, res) {
    res.render('privacy', { title: 'Privacy Policy' });
}

exports.terms = terms;
exports.privacy = privacy;
