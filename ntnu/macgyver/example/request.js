var request = require('request');
var cheerio = require('cheerio');
var url = 'https://abakus.no/event/calendar/';

var getData = function (callback) {
  request(url, function (err, response, html) {
    if(err || response.statusCode !== 200) {
      return console.error(err.message || 'Site not found');
    }
    var $ = cheerio.load(html);
    
    callback($('.day .event a')
      .map(function (i, el) {
        return $(el).text();
      })
      .toArray()
      .filter(function (text) {
        return text.indexOf('BEKK') !== -1;
      }));
  });
};

var numEvents = 0;

getData(function (events) {
  numEvents = events.length;
  console.log(numEvents, 'found');
});

setInterval(function () {
  getData(function (events) {
    var originalNum = numEvents, newNum = events.length;
    numEvents = newNum;
    if (originalNum >= newNum) return;

    console.log(newNum - originalNum, 'new BEKK events on Abacus.no');
  });
}, 5000);