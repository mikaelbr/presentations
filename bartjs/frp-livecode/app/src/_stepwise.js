
// Setup
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

// Gjør chat tilgjengelig til testing.
window.chat = chat;

// **********
// Skriv ut alle meldinger
// **********


// Først en måte å håndtere feil på
var errorHtml = bacon
  .fromEventTarget(chat, 'error')
  .map(h.template.error);
// nå har vi en event stream av feilmeldinger i HTML.


// Lag en event stream av meldinger fra selv og andre
var message = bacon.fromEventTarget(chat, 'message');

var newMessages = message
  // gjør om til HTML
  .map(h.template.message)
  // Merge inn stasj her...
  .merge(errorHtml)
  // Nå har vi en event stream av både meldinger og feilmeldinger.
  // "reduce", akkumuler alt
  .scan('', h.sum);

// sett akkumulerte som html på discussion
newMessages.assign($('.discussion'), 'html');


// **********
// Vis påloggede brukere
// **********


// Først for de brukerene som er pålogget.
// Generer fra ajax-kall
var onlineUsers = bacon.fromPromise($.ajax("/users"));

// Når data kommer fra AJAX-kallet
// Kommer som en array av user-objekter
onlineUsers
  // Loop over alle brukere og lag HTML
  .map(h.renderOnline)
  // Sett HTML på users-elementet
  .assign($('.users'), 'html');


// For de som kommer til

// Samme som for meldinger
var users = bacon.fromEventTarget(chat, 'join');

users
  // Får kun brukernavn, gjør om til brukerobjekt
  .map(h.toUserObject)
  // Gjør om til HTML via template
  .map(h.template.users)
  // Setter alle verdier
  .assign($('.users'), 'append');



// *************
// Håndtere når brukere disconnecter
// *************


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

// Flytt opp til under skriv ut alle meldinger
// merge partHtml inn til newMessages..


// ***********
// Går litt raskere frem
// ***********

// Opprette en event som triggres hver gang enter blir
// trykket i input-skjema
var enter = bacon
  .fromEventTarget($('#input-message'), 'keydown')
  .filter(function (e) {
    return e.keyCode === 13;
  })
  .doAction('.preventDefault');

// Generer en property først som har
// default verdi som tom streng ("")
// gjør om til en event stream som triggres
// hver gang enter har et nytt data-punkt.
var sentMessage = bacon
  .fromEventTarget($('#input-message'), 'keyup')
  .toProperty()
  // henter ur value fra event.
  .map('.target.value')
  // ny event stream, triggres hver gang enter blir kjørt
  .sampledBy(enter);


var messageSent = sentMessage
  // Filtrerer ut det som er join message
  .filter(h.notJoinMessage)
  // Send melding når noe som ikke er join-melding kommer inn
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

// Både når brukere joiner og sender melding
// må vi fjerne verdi fra form.
messageSent
  .merge(userJoined)
  .onValue(h.resetForm);



// Så for å gjøre det komplett
// Scroll ned når nye meldinger kommer inn.
newMessages
  .map(function () {
    return $('.discussion-wrap')[0].scrollHeight;
  })
  .assign($('.discussion-wrap'), 'scrollTop')
