var fs = require('fs');
var exec = require('child_process').exec;
var camera = require('camera');

var BleHR = require('heartrate');

var argv = require('yargs').argv;
var maxPulse = argv._[0];

// Open connection to heartrate monitor
var pulse = new BleHR('fe24657baa6440afa921b87fe170f4cb');

// Open connection to camera
var webcam = camera.createStream();

var hasBeenOver = false;

// Listen for heartrate data
pulse.on('data', function (current) {
  if (current < maxPulse) return;
  if (hasBeenOver) process.exit(0);
  hasBeenOver = true;

  // Say something thorugh the commandline
  say('Calm down, Mikael.');

  // Take image snapshot
  webcam.snapshot(function (err, buffer) {
    // Save the buffer as image
    fs.writeFileSync('snapshot.png', buffer);
    // Disconnect fomr camera
    webcam.destroy();
  });
});

process.on('SIGINT', function () {
  process.exit(0);
});

function say (message) {
  // Execute command <say -v Vick "message"> through command line
  return exec(['say', '-v', 'Vick', '"' + message + '"'].join(' '));
}