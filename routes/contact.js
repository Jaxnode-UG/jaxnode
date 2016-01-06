
/*
 * GET Contact page.
 */
function contact(req, res) {
    res.render('contact', { title: 'Contact the Jax Node User Group' });  
}

module.exports = contact;