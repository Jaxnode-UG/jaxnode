'use strict';

/*
 * List apps
 */
var path = require('path');
var appdata = require(path.join(__dirname, '../data/apps.json'));

function getApps(req, res) {
    res.render('apps', { title: 'JaxNode User Group Apps', data: appdata });
}

function getApp(req, res) {
    var selectedApp = appdata.filter(function (n) {
        return n.title === req.params.name;
    })[0];
    if (selectedApp === undefined) {
        res.status(404).render('error', {
            message: 'No app exists',
            error: {
                status: '404',
                stack: 'App ' + req.params.name + ' does not exist in our site.'
            }
        });
    } else {
        res.render('appdetail', { title: selectedApp.title, data: selectedApp });
    }
}

exports.apps = getApps;
exports.app = getApp;
