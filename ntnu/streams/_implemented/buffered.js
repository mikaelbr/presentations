var fs = require('fs');

console.log("Starting read:")
var data = fs.readFileSync('data/compiled.data');
console.log("Done reading");