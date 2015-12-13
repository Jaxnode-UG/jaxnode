/// <reference path="typings/node/node.d.ts"/>
"use strict";
/**
 * Module dependencies.
 */

var express = require('express');
var twitterdata = require('./services/twitterdata.js');
var meetupdata = require('./services/meetupdata.js');
var githubData = require('./services/githubdata.js');
var routes = require('./routes');
var contact = require('./routes/contact');
var sponsors = require('./routes/sponsors');
var servicefactory = require('./services/jaxnode-service.js');

var service = servicefactory(meetupdata, twitterdata);

var http = require('http');
var path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));

var exposeService = function(req, resp, next){
    req.service = service;
    req.GitHubData = githubData;
    next();
};

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', exposeService, routes.index);
app.get('/Contact', contact.contact);
app.get('/Sponsors', sponsors.list);
app.get('/Code', exposeService, routes.code);
app.get('/api', exposeService, routes.api);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
