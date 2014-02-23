var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');

var options = {
  channels: 2,
  bitDepth: 16,
  sampleRate: 44100
};

var decoder = new lame.Decoder(options);
var speaker = new Speaker(options);
var song = fs.createReadStream('data/sample.mp3');

song.pipe(decoder).pipe(speaker);