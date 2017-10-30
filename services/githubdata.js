'use strict';

const fetch = require('node-fetch');
const cache = require('memory-cache');
/*
 * Setting up link to GitHub
 */

/*
 * Replaced Callback function with one that returns a Promise.
 * Now this function can be used with async/await syntax
 */
function getGithubRepos() {
    return new Promise((resolve, reject) => {
        const githubcache = cache.get('githubrepos');
        if (githubcache) {
            resolve({ repos: githubcache });
        } else {
            fetch('https://api.github.com/orgs/jaxnode-ug/repos',
                {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        'User-Agent': 'JaxNode'
                    }
                }).then(response => {
                return response.json();
            }).then(json => {
                cache.put('githubrepos', json, 3600000);
                resolve({ repos: json });
            }).catch(err => {
                console.error(err);
                reject(err);
            });
        }
    });
}

//module.exports = getCode;
module.exports = getGithubRepos;
