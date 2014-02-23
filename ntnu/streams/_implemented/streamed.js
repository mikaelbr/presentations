#!/usr/bin/env node

//=> File: 2.js

var fs = require('fs');

console.log("Starting read:")
var readStream = fs.createReadStream('../data/compiled.data');
readStream.pipe(process.stdout);

// Usage:
// $ node streamed.js
// $ node streamed.js | grep Sochi | head -n1