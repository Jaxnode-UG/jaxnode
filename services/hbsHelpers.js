/*eslint-disable*/
'use strict';
var path = require('path');
var pkg = require(path.join(__dirname, '../package.json'));

function addHBSHelpers(Handlebars) {
    Handlebars.registerHelper('activeMenu', function (route, name, test, title) {
        if (test === title) {
            return new Handlebars.SafeString("<li class='active'><a href='" + route + "'>" + name + "</a></li>"); // eslint-disable-line
        } else {
            return new Handlebars.SafeString("<li><a href='" + route + "'>" + name + "</a></li>"); // eslint-disable-line
        }
    });

    Handlebars.registerHelper('copyrightYear', function () {
        var year = new Date().getFullYear();
        return new Handlebars.SafeString(year);
    });

    Handlebars.registerHelper('currentVersion', function () {
        return new Handlebars.SafeString(pkg.version);
    });
    
    Handlebars.registerHelper('nodeVersion', function () {
        return new Handlebars.SafeString('Running on Node ' + process.version);
    });
}

module.exports = addHBSHelpers;
