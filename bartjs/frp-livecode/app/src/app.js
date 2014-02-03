var $ = require('jquery'),
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