# Source for JaxNode.com

![JaxNode Logo](https://www.jaxnode.com/images/jaxnodejs.png)

This is the source code for the JaxNode website.

[![Build Status](https://travis-ci.org/davidfekke/jaxnode.svg?branch=release)](https://travis-ci.org/davidfekke/jaxnode)
[![Coverage Status](https://coveralls.io/repos/github/davidfekke/jaxnode/badge.svg?branch=master)](https://coveralls.io/github/davidfekke/jaxnode?branch=master)
[![Node v8](http://img.shields.io/badge/node-v8.11.1-brightgreen.svg)](https://nodejs.org)
[![Node v9](http://img.shields.io/badge/node-v10.0.0-brightgreen.svg)](https://nodejs.org)

The website can be viewed at [https://www.jaxnode.com](https://www.jaxnode.com).

There are five environment variables that need to be set up in order to use the feed and the twitter.
They are as follows;

* process.env.meetupapi_key = Meetup API Key
* process.env.twitter_ck = Twitter consumer_key
* process.env.twitter_cs = Twitter consumer_secret
* process.env.twitter_atk = Twitter access_token_key
* process.env.twitter_ats = Twitter access_token_secret

Moved site to Heroku. Upgraded to Node.js v10.0.0. Version 3.0 of this code requires Node.js 8.6 or higher because of the use of async/await.

Copyright 2018 David Fekke
