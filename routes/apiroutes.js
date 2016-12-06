'use strict';
var express = require('express');
var appRoutes = require('./apicontroller.js');
var router = express.Router(); // eslint-disable-line

router.get('/meeting', appRoutes.meeting);
router.get('/github', appRoutes.github);
router.get('/sponsors', appRoutes.sponsors);

module.exports = router;
