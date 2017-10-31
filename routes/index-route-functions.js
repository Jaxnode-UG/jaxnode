'use strict';

/*
 * GET home page.
 */
exports.index = async function index(req, res) {
    try {
        const meetingArray = await req.service.getNextMeetup();
        const tweetResults = await req.service.getTweets();
        const displayMeetup = Object.keys(meetingArray).length !== 0;
        if (displayMeetup && meetingArray.hasOwnProperty('venue')) {
            var displayMap = Object.keys(meetingArray.venue).length !== 0;
        }
        const displayTweets = tweetResults.tweets.length !== 0;
        res.render('index', {
            title: 'JaxNode User Group',
            meeting: meetingArray,
            tweets: tweetResults.tweets,
            displayMeetup: displayMeetup,
            displayMap: displayMap,
            displayTweets: displayTweets
        });
    } catch (err) {
        console.log('problem with meetup request: ' + err);
        res.status(500).render('error', {
            message: 'No app exists',
            error: {
                status: '500',
                stack: 'App Error'
            }
        });
    }
};

exports.code = async function code(req, res) {
    var pagenum = 0;
    if (req.params.page && !isNaN(req.params.page)) {
        pagenum = req.params.page;
    }
    try {
        const resp = await req.getCode();
        const sortedRepos = resp.repos.sort(nameCompare);
        const repopage = sortedRepos.slice(parseInt(pagenum) * 10, parseInt(pagenum) * 10 + 10);
        const pageCount = Math.ceil(sortedRepos.length / 10);
        if (pagenum > pageCount - 1) {
            res.status(404).render('error', {
                message: 'This github page does not exist',
                error: {
                    status: '404',
                    stack: 'This github page does not exist.'
                }
            });
        } else {
            res.render('code', { title: 'Jax Node GitHub code', repos: repopage, currPage: pagenum, pageCount: pageCount });    
        }
    } catch (err) {
        console.log('problem with request: ' + err);
        res.status(500).render('error', {
            message: 'problem with request',
            error: {
                status: '500',
                stack: 'problem with request'
            }
        });
    }
};

exports.api = async function api(req, res) {
    try {
        const results = await req.service.getNextMeetup();
        res.send({ meeting: results });
    } catch (err) {
        res.status(500).send({ meeting: 'Error occured' });
    }
};

function nameCompare(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) { //sort string ascending
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0; //default
}

exports.nameCompare = nameCompare;
