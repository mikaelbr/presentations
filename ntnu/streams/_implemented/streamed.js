var fs = require('fs');

console.log("Starting read:")
var readStream = fs.createReadStream('compiled.data');
readStream.pipe(process.stdout);