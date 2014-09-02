var fs = require('fs');
var through = require('through2');
var split = require('split');
var twitter = require('./twitterReader.js');

// var url = "https://stream.twitter.com/1.1/statuses/filter.json";
var url = "https://stream.twitter.com/1.1/statuses/sample.json";
var file = fs.createWriteStream('streamSample.data');

var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.clearLine = function() {
    this.write(null, {ctrl: true, name: 'u'});
};

// twitter(url, {track: 'github,javascript,js,node.js'}, function (req, res) {
twitter(url, function (req, res) {
  req.on('error', function (err) {
    console.log(err);
  })
  res.pipe(file);

  var num = 0;

  res
  .pipe(split())
  .pipe(through.obj(function (file, enc, cb) {
    this.push({total: ++num});
    cb();
  })).on('data', function (data) {
    rl.clearLine();
    rl.write("Totalt antall tweets: " + data.total);
  });
});