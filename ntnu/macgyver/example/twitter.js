var config = require('./config');
var Twitter = require('twit-stream');
var Notification = require('node-notifier');

var options = {
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  oauth_token: config.OAUTH_TOKEN,
  oauth_secret: config.OAUTH_SECRET
};

var notifier = new Notification();
var stream = new Twitter(options).filter({ track: 'ntnu' });

stream.on('data', function (data) {
  if (!data) return;

  notifier.notify({
    title: 'New Twitter Mention:',
    message: data.text
  });
});