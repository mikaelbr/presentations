var fs = require('fs');
var exec = require('child_process').exec;
var camera = require('camera');
var BleHR = require('heartrate');
var argv = require('yargs').argv;
var maxPulse = argv._[0];

var hasBeenOver = false;

// Open connection to heartrate monitor
var pulse = new BleHR('fe24657baa6440afa921b87fe170f4cb');


//==================================================

// Open connection to camera
var webcam = camera.createStream();

// Listen for heartrate data
pulse.on('data', function (current) {
  if (current < maxPulse) return;
  if (hasBeenOver) process.exit(0);
  hasBeenOver = true;

  // Say something thorugh the command line
  say('Dudu dudu duu, dudu duu.');

  // Take image snapshot
  webcam.snapshot(function (err, buffer) {
    // Save the buffer as image
    fs.writeFileSync('snapshot.png', buffer);
    // Disconnect fomr camera
    webcam.destroy();
  });
});

function say (message) {
  // Execute command <say -v Alex "message"> through command line
  return exec(['say', '-v', 'Alex', '"' + message + '"'].join(' '));
}

//==================================================



process.on('SIGINT', function () {
  process.exit(0);
});
