var fs = require('fs');

setupSlideshow();

function setupSlideshow () {
  var data = fs.readFileSync(__dirname + '/../slides/slides.md', 'utf8');
  document.querySelector('#source').innerHTML = data;

  var slideshow = remark.create({
    ratio: '16:9',
    highlightStyle: 'monokai'
  });
}
