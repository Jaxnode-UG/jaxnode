'use strict';

var https = require('https');

/*
 * Set up GitHub http options for the GitHub API.
 */
var gitHubOptions = {
    hostname: 'api.github.com',
    port: 443,
    path: '/users/jaxnode/repos',
    method: 'GET',
    headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'JaxNode'
    }
};

/*
 * Setting up link to GitHub
 */
function getCode(cb) {
    var reposText = '';
    var githubReq = https.request(gitHubOptions, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            //console.log('receiving data.');
            reposText += chunk;
        });
        response.on('end', function () {
            var reposArray = JSON.parse(reposText);
            cb(null, { repos: reposArray });
        });
    });
    githubReq.on('error', function (e) {
        console.log('problem with request: ' + e.message);
        cb(e, { repos: [] });
    });
    githubReq.write('data\n');
    githubReq.end();
}

module.exports = getCode;
