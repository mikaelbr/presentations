var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var minimatch = require('minimatch');

var baseLookup = argv.base;
var pattern = argv.pattern;
var newName = argv.name;

if(!baseLookup) {
  baseLookup = process.cwd();
  console.info('No base directory found. Using current directory.');
}

if (!pattern) {
  console.info('No pattern found. Renames all files');
}

if (!newName) {
  newName = 'newFile%s';
  console.info('No newName found. Using default name');
}

fs.readdir(baseLookup, function (err, files) {
  if (pattern) {
    files = files.filter(minimatch.filter(pattern));
  }

  files.forEach(renameFiles);
});

function renameFiles (filename, index) {
  filename = path.join(baseLookup, filename);
  var ext = path.extname(filename);
  var base = path.dirname(filename);
  var newFile = path.join(base, newName.replace(/%s/g, index) + ext);

  fs.rename(filename, newFile, function (err) {
    if (err) {
      console.error('Could not rename', filename, 'to', newFile, '(', err.message, ')');
      return;
    }
    console.log('Renamed', filename, 'to', newFile);
  });
}