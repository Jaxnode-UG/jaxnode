var express = require('express');
var appRoutes = require('./appcontroller.js');
var router = express.Router();

router.get('/', appRoutes.apps);
router.get('/:name', appRoutes.app);

module.exports = router;