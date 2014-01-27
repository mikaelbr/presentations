var $ = require('jquery-browserify'),
    bacon = require('baconjs'),
    chat = require('./chat'),
    h = require('./helpers'),
    _ = require('lodash');

// Setup observables
var message = bacon.fromEventTarget(chat, 'message');
var errors = bacon.fromEventTarget(chat, 'error');
var users = bacon.fromEventTarget(chat, 'join');
var part = bacon.fromEventTarget(chat, 'part')
  .filter(function (user) {
    return !!user;
  });


// List all messages.
var newMessages = message
  .map(h.template.message)
  .scan('', h.sum)
  .assign($('.discussion'), 'html');


bacon.fromPromise($.ajax("/users"))
  .map(h.renderOnline)
  .assign($('.users'), 'html');

var newUser = users
  .map(h.toUserObject)
  .map(h.template.users)
  .onValue(function (el) {
    $('.users').append(el);
  });

// ---
var enter = bacon
  .fromEventTarget($('#input-message'), 'keydown')
  .filter(function (e) {
    return e.keyCode === 13;
  })
  .doAction('.preventDefault');

var sentMessage = bacon
  .fromEventTarget($('#input-message'), 'keyup')
  .toProperty()
  .map(h.toValue)
  .sampledBy(enter);

var messageSent = sentMessage
  .filter(h.notJoinMessage)
  .doAction(function (val) {
    chat.message(val);
  });

var userJoined = sentMessage
  .filter(h.isJoinMessage)
  .map(h.toUsername)
  .doAction(function (val) {
    chat.join(val);
  });

messageSent
  .merge(userJoined)
  .onValue(h.resetForm)
