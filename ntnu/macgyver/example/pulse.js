var BleHR = require('heartrate');
var pulse = new BleHR('fe24657baa6440afa921b87fe170f4cb');
var argv = require('yargs').argv;

var maxPulse = argv._[0];

var hasBeenOver = false;

pulse.on('data', function (current) {
  if (current < maxPulse) return;
  if (hasBeenOver) process.exit(0);
  hasBeenOver = true;


  say('Calm down, Mikael.');
  webcam.snapshot(function (err, buffer) {
    fs.writeFileSync('snapshot.png', buffer);
    webcam.destroy();
  });
});

process.on('SIGINT', function () {
  process.exit(0);
});

function say (message) {
  return exec(['say', '-v', 'Vick', '"' + message + '"']);
}