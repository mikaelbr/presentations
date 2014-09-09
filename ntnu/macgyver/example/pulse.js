var BleHR = require('heartrate');
var pulse = new BleHR('fe24657baa6440afa921b87fe170f4cb');
var argv = require('yargs').argv;

var maxPulse = argv._[0];

pulse.on('data', function (current) {
   if (current < maxPulse) return;
   say('Calm down, Mikael.');
});

process.on('SIGINT', function () {
  process.exit(0);
});

function say (message) {
  return exec(['say', '-v', 'Vick', '"' + message + '"']);
}