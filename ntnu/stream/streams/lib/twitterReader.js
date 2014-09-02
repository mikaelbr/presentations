var OAuth = require('oauth');

var OAUTH_BASE = 'https://api.twitter.com/oauth';

var CONSUMER_KEY = "L6Vdp22RgNQMw657GFDGBg";
var CONSUMER_SECRET = "wBL9TWKQQWTyh0IO9V4D6PN4DNFsbEozY9n7pekSnmY";

var OAUTH_TOKEN = "40382389-Nu5fNXgfwbrl88PBcFZBEyk5YUwHW2oDDmZWWNc6H";
var OAUTH_SECRET = "obTtha4PhxQ80sQaoNNnZbXZuYO1LYkjSRWKGyN2Q";


var oauth = new OAuth.OAuth(OAUTH_BASE + '/request_token', OAUTH_BASE + '/access_token',
      CONSUMER_KEY, CONSUMER_SECRET, '1.0A', null,'HMAC-SHA1');


module.exports = function (url, data, cb) {
	cb = cb || data;
	if (!cb || typeof cb !== 'function') throw new Error('Callback needs to be an error');
	
	var req = oauth.post(url, OAUTH_TOKEN, OAUTH_SECRET, data);
	req.on('response', function (res) {
      	res.setEncoding('utf8');
		cb(req, res);
	});
	req.end();
};
