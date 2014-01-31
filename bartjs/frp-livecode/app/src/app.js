var $ = require('jquery-browserify'),
    bacon = require('baconjs'),
    chat = require('./chat'),
    h = require('./helpers'),
    _ = require('lodash');


 /* Chat har tilgjengelig følgende:
 * - join(String)    : Connect og join
 * - message(String) : Send melding
 *
 * Sender ut events når dette skjer.
 */

// Gjør chat tilgjengelig for testing.
window.chat = chat;
window.m = chat.message.bind(chat);

chat.on('connected', function () {
  chat.join('mikaelb');
});


var newMessage =
  bacon.fromEventTarget(chat, 'message')
  .map(h.template.message)
  .scan('', h.sum)
  .assign($('.discussion'), 'html');

var join =
  bacon.fromEventTarget(chat, 'join')
  .map(h.toUserObject)
  .map(h.template.users)
  .assign($('.users'), 'append');

var online =
  bacon.fromPromise($.getJSON('/users'))
  .map(h.renderOnline)
  .assign($('.users'), 'html');


var part =
  bacon.fromEventTarget(chat, 'part')
  .filter(function (username) {
    return !!username;
  });

part.onValue(function (user) {
  $(".users [data-user="+ user+"]").remove();
});
