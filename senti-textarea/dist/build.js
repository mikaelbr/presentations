(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


setupSlideshow();

function setupSlideshow () {
  var data = "class: front-page\n\n# Redusere trolling?\n## Bruk av maskinlæring for mulig intelligent/adaptive design\n\nMikael Brevik\n\nSenior Bootcamp, Berlin 2016\n\n\n---\nbackground-image: url(assets/troll1.jpg)\nclass: middle midcover\n\n---\nbackground-image: url(assets/troll-search.png)\nclass: middle cover\n\n---\nbackground-image: url(assets/trolling.png)\nclass: middle\n\n---\nbackground-image: url(assets/smile.jpg)\nclass: middle midcover\n\n---\nclass: middle\n\n```js\nconst sentiment = analyse(`\n  I HOPE YOUR WHOLE FAMILY GET CANCER AND DIES\n  BY A CAR ACCIDENT. U FUCKING LITTLE BASTARD.\n  I GONNA KILL YOU.\n`);\n\nconsole.log(sentiment);\n//=> 0.02152717\n```\n\n---\n\n<video src=\"assets/demo1.mp4\" controls></video>\n---\n\n<video src=\"assets/demo2.mp4\" controls></video>\n\n---\nclass: center middle\n\n# Kommentarer, tanker, idéer?\nTwitter *@mikaelbrevik*!\n\nEksempelkode: https://github.com/mikaelbr/azure-ml-text-analysis\n";
  document.querySelector('#source').innerHTML = data;

  var slideshow = remark.create({
    ratio: '16:9',
    highlightStyle: 'monokai'
  });
}

},{}]},{},[1]);
