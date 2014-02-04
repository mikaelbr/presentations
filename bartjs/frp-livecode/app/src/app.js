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

// chat.on('connected', function () {
//   chat.join('mikaelb');
// });


// Server sender ut part-event hver gang noen quiter
var part = bacon.fromEventTarget(chat, 'part')
  .filter(function (user) {
    return !!user;
  });

// Fjern fra listen.
part.onValue(function (user) {
  $(".user[data-user='"+user+"']").remove();
});


// Når noen quiter
var partHtml = part
  // Gjør om til user-objekt
  .map(h.toUserObject)
  // Konvertere til HTML.
  .map(h.template.parting);


var error =
  bacon.fromEventTarget(chat, 'error')
  .map(h.template.error);

var newMessage =
  bacon.fromEventTarget(chat, 'message')
  .map(h.template.message)
  .merge(partHtml)
  .merge(error);

newMessage.assign($(".discussion"), "append");

bacon.fromEventTarget(chat, 'join')
  // Får kun brukernavn, gjør om til brukerobjekt
  .map(h.toUserObject)
  // Gjør om til HTML via template
  .map(h.template.users)
  // Setter alle verdier
  .assign($('.users'), 'append');


var onlineUsers =
  bacon.fromPromise($.getJSON("/users"))
  .map(h.renderOnline)
  .assign($('.users'), 'html');


var enter =
  bacon.fromEventTarget($("#input-message"), "keydown")
  .filter(function (e) {
    return e.keyCode === 13;
  })
  .doAction(".preventDefault");

var sentMessage =
  bacon.fromEventTarget($("#input-message"), "keyup")
  .toProperty()
  .map(".target.value")
  .sampledBy(enter);

var messageSent = sentMessage
  .filter(h.notJoinMessage)
  .doAction(function (val) {
    chat.message(val);
  });


// Samme som messageSent bare når brukere kommer inn.
var userJoined = sentMessage
  .filter(h.isJoinMessage)
  .map(h.toUsername)
  .doAction(function (val) {
    chat.join(val);
  });

messageSent
  .merge(userJoined)
  .onValue(h.resetForm);

newMessage
  .map(function () {
    return $('.discussion-wrap')[0].scrollHeight;
  })
  .assign($('.discussion-wrap'), 'scrollTop')












// ==============================================
// Ligger kommentert - skal pastes inn:

// // For brukere som joiner:

// // Samme som for meldinger
// bacon.fromEventTarget(chat, 'join')
//   // Får kun brukernavn, gjør om til brukerobjekt
//   .map(h.toUserObject)
//   // Gjør om til HTML via template
//   .map(h.template.users)
//   // Setter alle verdier
//   .assign($('.users'), 'append');


// // Samme som messageSent bare når brukere kommer inn.
// var userJoined = sentMessage
//   .filter(h.isJoinMessage)
//   .map(h.toUsername)
//   .doAction(function (val) {
//     chat.join(val);
//   });

// // Både når brukere joiner og sender melding
// // må vi fjerne verdi fra form.
// messageSent
//   .merge(userJoined)
//   .onValue(h.resetForm);



// // Så for å gjøre det komplett
// // Scroll ned når nye meldinger kommer inn.
// newMessages
//   .map(function () {
//     return $('.discussion-wrap')[0].scrollHeight;
//   })
//   .assign($('.discussion-wrap'), 'scrollTop')



// // *************
// // Håndtere når brukere disconnecter
// // *************

// // Server sender ut part-event hver gang noen quiter
// var part = bacon.fromEventTarget(chat, 'part')
//   .filter(function (user) {
//     return !!user;
//   });

// // Fjern fra listen.
// part.onValue(function (user) {
//   $(".user[data-user='"+user+"']").remove();
// });


// // Når noen quiter
// var partHtml = part
//   // Gjør om til user-objekt
//   .map(h.toUserObject)
//   // Konvertere til HTML.
//   .map(h.template.parting);

// // Flytt opp til under skriv ut alle meldinger
// // merge partHtml inn til newMessages..


// // ==============================================