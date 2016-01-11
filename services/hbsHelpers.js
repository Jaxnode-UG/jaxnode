"use strict"
var path = require('path'),
	pkg = require( path.join(__dirname, '../package.json') );
    
function addHBSHelpers(Handlebars) {
    Handlebars.registerHelper('activeMenu', function(route, name, test, title) {
        if (test === title) {
            return new Handlebars.SafeString(
                "<li class='active'><a href='" + route + "'>" + name + "</a></li>"
            );    
        } else {
            return new Handlebars.SafeString(
                "<li><a href='" + route + "'>" + name + "</a></li>"
            );
        }
    });

    Handlebars.registerHelper('copyrightYear', function() {
        var year = new Date().getFullYear();
        return new Handlebars.SafeString(year);
    });
    
    Handlebars.registerHelper('currentVersion', function() {
        return new Handlebars.SafeString(pkg.version);
    });
}

module.exports = addHBSHelpers;