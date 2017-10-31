/*eslint-disable*/
'use strict';
const repos = require('../data/githubsample.json');

const results = { repos: repos };
// var results = { repos: 
//    [ { id: 32475224,
//        name: 'gulptest',
//        full_name: 'jaxnode/gulptest',
//        owner: [Object],
//        private: false,
//        html_url: 'https://github.com/jaxnode/gulptest',
//        description: 'Forked for March presentation',
//        fork: true,
//        url: 'https://api.github.com/repos/jaxnode/gulptest',
//        forks_url: 'https://api.github.com/repos/jaxnode/gulptest/forks',
//        keys_url: 'https://api.github.com/repos/jaxnode/gulptest/keys{/key_id}',
//        collaborators_url: 'https://api.github.com/repos/jaxnode/gulptest/collaborators{/collaborator}',
//        teams_url: 'https://api.github.com/repos/jaxnode/gulptest/teams',
//        hooks_url: 'https://api.github.com/repos/jaxnode/gulptest/hooks',
//        issue_events_url: 'https://api.github.com/repos/jaxnode/gulptest/issues/events{/number}',
//        events_url: 'https://api.github.com/repos/jaxnode/gulptest/events',
//        assignees_url: 'https://api.github.com/repos/jaxnode/gulptest/assignees{/user}',
//        branches_url: 'https://api.github.com/repos/jaxnode/gulptest/branches{/branch}',
//        tags_url: 'https://api.github.com/repos/jaxnode/gulptest/tags',
//        blobs_url: 'https://api.github.com/repos/jaxnode/gulptest/git/blobs{/sha}',
//        git_tags_url: 'https://api.github.com/repos/jaxnode/gulptest/git/tags{/sha}',
//        git_refs_url: 'https://api.github.com/repos/jaxnode/gulptest/git/refs{/sha}',
//        trees_url: 'https://api.github.com/repos/jaxnode/gulptest/git/trees{/sha}',
//        statuses_url: 'https://api.github.com/repos/jaxnode/gulptest/statuses/{sha}',
//        languages_url: 'https://api.github.com/repos/jaxnode/gulptest/languages',
//        stargazers_url: 'https://api.github.com/repos/jaxnode/gulptest/stargazers',
//        contributors_url: 'https://api.github.com/repos/jaxnode/gulptest/contributors',
//        subscribers_url: 'https://api.github.com/repos/jaxnode/gulptest/subscribers',
//        subscription_url: 'https://api.github.com/repos/jaxnode/gulptest/subscription',
//        commits_url: 'https://api.github.com/repos/jaxnode/gulptest/commits{/sha}',
//        git_commits_url: 'https://api.github.com/repos/jaxnode/gulptest/git/commits{/sha}',
//        comments_url: 'https://api.github.com/repos/jaxnode/gulptest/comments{/number}',
//        issue_comment_url: 'https://api.github.com/repos/jaxnode/gulptest/issues/comments{/number}',
//        contents_url: 'https://api.github.com/repos/jaxnode/gulptest/contents/{+path}',
//        compare_url: 'https://api.github.com/repos/jaxnode/gulptest/compare/{base}...{head}',
//        merges_url: 'https://api.github.com/repos/jaxnode/gulptest/merges',
//        archive_url: 'https://api.github.com/repos/jaxnode/gulptest/{archive_format}{/ref}',
//        downloads_url: 'https://api.github.com/repos/jaxnode/gulptest/downloads',
//        issues_url: 'https://api.github.com/repos/jaxnode/gulptest/issues{/number}',
//        pulls_url: 'https://api.github.com/repos/jaxnode/gulptest/pulls{/number}',
//        milestones_url: 'https://api.github.com/repos/jaxnode/gulptest/milestones{/number}',
//        notifications_url: 'https://api.github.com/repos/jaxnode/gulptest/notifications{?since,all,participating}',
//        labels_url: 'https://api.github.com/repos/jaxnode/gulptest/labels{/name}',
//        releases_url: 'https://api.github.com/repos/jaxnode/gulptest/releases{/id}',
//        created_at: '2015-03-18T17:56:15Z',
//        updated_at: '2015-03-20T01:41:07Z',
//        pushed_at: '2015-03-20T01:41:07Z',
//        git_url: 'git://github.com/jaxnode/gulptest.git',
//        ssh_url: 'git@github.com:jaxnode/gulptest.git',
//        clone_url: 'https://github.com/jaxnode/gulptest.git',
//        svn_url: 'https://github.com/jaxnode/gulptest',
//        homepage: '',
//        size: 84,
//        stargazers_count: 0,
//        watchers_count: 0,
//        language: 'JavaScript',
//        has_issues: false,
//        has_downloads: true,
//        has_wiki: true,
//        has_pages: false,
//        forks_count: 0,
//        mirror_url: null,
//        open_issues_count: 0,
//        forks: 0,
//        open_issues: 0,
//        watchers: 0,
//        default_branch: 'master' } ] };
       
function getCode() {
    return new Promise((resolve, reject) => {
        resolve(results);
    });
    //cb(null, results);
};

module.exports = getCode;