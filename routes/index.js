'use strict';
var express = require('express');
var indexRoutes = require('./index-route-functions');
var sponsors = require('./sponsors');
var contact = require('./contact');
var termRoutes = require('./terms');
var router = express.Router(); // eslint-disable-line

/* GET home page. */
router.get('/', indexRoutes.index);
router.get('/contact', contact);
router.get('/terms', termRoutes.terms);
router.get('/privacy', termRoutes.privacy);
router.get('/sponsors', sponsors.list);
router.get('/api', indexRoutes.api);
router.get('/code', indexRoutes.code);

module.exports = router;
