import {ErrorReporter} from 'traceur@0.0/src/util/ErrorReporter';
import {transcode} from './transcode';

var elms = Array.prototype.slice.apply(document.querySelectorAll('.repl-input'));
elms.forEach(createCM);

var errorElement = document.querySelector('pre.error');
var outputElement = document.querySelector('pre.output');

function clearOutput () {
  outputElement.textContent = "";
  outputElement.hidden = true;

  errorElement.textContent = "";
  errorElement.hidden = true;
}

function createCM(el) {
  var em = CodeMirror.fromTextArea(el, {
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
        clearOutput();
      }
    }
  });

  Reveal.addEventListener( 'slidechanged', function () {
    em.refresh();
  });
};



Reveal.addEventListener( 'slidechanged', clearOutput);

var printableFalsy = function (arr) {
  return arr.map(function (str) {
    if (str === void 0) {
      return "undefined";
    }
    if (str === null) {
      return "null";
    }
    return str;
  });
};

var setValueLineUnder = function (...rest) {
  var value = printableFalsy(rest).join(" ");
  var print = value.split("\n").map(function (txt) {
    return "// => " + txt;
  }).join("\n");

  outputElement.textContent +=  print + "\n";
  outputElement.hidden = false;
};

window.log = setValueLineUnder;

function compile(contents) {
  if (!outputElement) {
    return;
  }
  clearOutput();

  function onSuccess(mod) { }
  function onFailure(errors) {
     errorElement.hidden = false;
     var filtered = errors.map(function (err) {
      return err.split(/\d:\d+\:\s+/)[1];
     })

     errorElement.textContent = filtered.join('\n');
  }

  function onTranscoded(metadata, url) {  }

  if (transcode)
    transcode(contents, onSuccess, onFailure, onTranscoded);
}