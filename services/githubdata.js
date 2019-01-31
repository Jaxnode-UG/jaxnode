'use strict';

const fetch = require('node-fetch');
const axios = require('axios');
const cache = require('memory-cache');
/*
 * Setting up link to GitHub
 */

 async function getGithubReposV2() {
    const githubcache = cache.get('githubrepos');
    if (githubcache) {
        return { repos: githubcache };
    } else {
        const orgResp = await axios.get('https://api.github.com/orgs/jaxnode-ug', {
            headers: {
                Accept: 'application/vnd.github.v3+json',
                'User-Agent': 'JaxNode'
            }
        });
        let repoCounter = Math.ceil(orgResp.data.public_repos / 30);
        let repos = [];
        for (var i = 1; i <= repoCounter; i++) {
            if (i == 1) {
                const repoResponse = await axios.get('https://api.github.com/orgs/jaxnode-ug/repos',
                {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        'User-Agent': 'JaxNode'
                    }
                });
                repos = repoResponse.data;
            } else {
                const repoResponse = await axios.get(`https://api.github.com/orgs/jaxnode-ug/repos?page=${i}`,
                {
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        'User-Agent': 'JaxNode'
                    }
                });
                repos = [...repos, ...repoResponse.data];
            }
        }
        const json = repos;
        cache.put('githubrepos', json, 3600000);
        return { repos: json };
    }
 }
 
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
module.exports = getGithubReposV2;
