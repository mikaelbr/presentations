import {ErrorReporter} from 'traceur@0.0/src/util/ErrorReporter';
import {transcode} from './transcode';

var elms = Array.prototype.slice.apply(document.querySelectorAll('.repl-input'));
elms.forEach(createCM);

var errorElement = document.querySelector('pre.error');
var outputElement = document.querySelector('pre.output');

function createCM(el) {
  CodeMirror.fromTextArea(el, {
    lineNumbers: true,
      //defining some keyboard shortcuts
    extraKeys: {
      "Ctrl-S": function(cm) {
        var selection = cm.getSelection();

        if (selection) {
          return compile(selection);
        }

        compile(cm.getValue());
      },
      "Ctrl-U": function(cm) {
        outputElement.innerHTML = "";
      }
    }
  });
};

Reveal.addEventListener( 'slidechanged', function( event ) {
  outputElement.innerHTML = "";
});

var setValueLineUnder = function (...rest) {
  var value = null;
  if (rest.length !== 1) {
    value = rest.join(" ");
  }
  var print = value.split("\n").map(function (txt) {
    return "// => " + txt;
  }).join("\n");

  outputElement.innerHTML +=  print + "\n";
};

window.log = setValueLineUnder;

function compile(contents) {
  if (!outputElement) {
    return;
  }
  outputElement.innerHTML = "";

  errorElement.hidden = true;
  function onSuccess(mod) { }
  function onFailure(errors) {
     errorElement.hidden = false;
     errorElement.textContent = errors.join('\n');
  }

  function onTranscoded(metadata, url) {  }

  if (transcode)
    transcode(contents, onSuccess, onFailure, onTranscoded);
}