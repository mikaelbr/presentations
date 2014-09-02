#!/usr/bin/env node

var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var file = __dirname + '/data/gummiboll.mp3';

var options = {
  channels: 2,
  bitDepth: 16,
  sampleRate: 44100
};

var decoder = new lame.Decoder(options);
var speaker = new Speaker(options);
var song = fs.createReadStream(file);

song.pipe(decoder).pipe(speaker);