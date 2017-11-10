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

    Handlebars.registerHelper('nodeVersionBug', function () {
        return new Handlebars.SafeString('<a target="_blank" href="https://nodejs.org"><image src="https://img.shields.io/badge/node-' + process.version + '-brightgreen.svg" alt="Running on Node ' + process.version + '" /></a>');
    });
    
    Handlebars.registerHelper('pager', function (currentPage, totalpages) {
        const currPage = parseInt(currentPage);
        const total = parseInt(totalpages);
        let previous = '';
        let next = '';
        let pagelinks = '';
        if (currPage === 0) {
            previous = new Handlebars.SafeString('<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>');
        } else {
            if ((currPage - 1) === 0) {
                previous = new Handlebars.SafeString('<li class="page-item"><a class="page-link" href="/code">Previous</a></li>');
            } else {
                previous = new Handlebars.SafeString('<li class="page-item"><a class="page-link" href="/code/' + (currPage - 1) + '">Previous</a></li>');
            }
        }
        for (let i = 0; i < total; i++) {
            if (i === currPage) {
                pagelinks += new Handlebars.SafeString('<li class="page-item disabled"><a class="page-link" href="#">' + (i + 1) + '</a></li>');
            } else {
                if (i === 0) {
                    pagelinks += new Handlebars.SafeString('<li class="page-item"><a class="page-link" href="/code">' + (i + 1) + '</a></li>');
                } else {
                    pagelinks += new Handlebars.SafeString('<li class="page-item"><a class="page-link" href="/code/' + i + '">' + (i + 1) + '</a></li>');
                }    
            }
        }
        if (currPage === (total - 1)) {
            next = new Handlebars.SafeString('<li class="page-item disabled"><a class="page-link" href="#">Next</a></li>');
        } else {
            next = new Handlebars.SafeString('<li class="page-item"><a class="page-link" href="/code/' + (currPage + 1) + '">Next</a></li>');
        }
        const beginnav = new Handlebars.SafeString('<nav aria-label="Page navigation example"><ul class="pagination">');
        const endnav = new Handlebars.SafeString('</ul></nav>');
        return beginnav + previous + pagelinks + next + endnav;
    });
}

module.exports = addHBSHelpers;
