'use strict';
const githubdata = require('../fakes/githubfake');

test('Test Github data fake', async () => {
    const results = await githubdata();
    const repos = results.repos;
    expect(repos[0].name).toBe('gulptest');
});