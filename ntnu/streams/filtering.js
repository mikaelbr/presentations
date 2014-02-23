var fs = require('fs');
var through = require('through2');
var split = require('split');

fs.createReadStream('data/compiled.data')
  .pipe(split(JSON.parse)) // split on new line
  .pipe(through.obj(function (obj, enc, next) {
    obj.text && this.push(new Buffer(obj.text.replace(/\n/g, " ")) + "\n");
    next();
  }))
  .pipe(through.obj(function (tweet, enc, next) {
    if (tweet && /Sochi/ig.test(tweet) && !/^RT/.test(tweet)) {
      this.push(tweet);
    }
    next();
  }))
  .pipe(process.stdout)
  .on('error', function() {
    process.exit(1);
  });