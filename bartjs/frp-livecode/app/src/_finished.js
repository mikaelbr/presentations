// var $ = require('jquery-browserify'),
//     bacon = require('baconjs'),
//     chat = require('./chat'),
//     _ = require('lodash'),
//     template = _.template,
//     messageTemplate = template($('#messageTemplate').html()),
//     usersTemplate = template($('#usersTemplate').html()),
//     partingTemplate = template($('#partingTemplate').html()),
//     errorTemplate = template($('#errorTemplate').html());


// var joinRegex = /^\/j(?:oin)?\s+([\w]+)/i;

// var sum = function (acc, message) {
//   return acc + message;
// };

// var toUserObject = function (username) {
//   return {
//     username: username
//   };
// };

// var resetForm = function() {
//   $("#input-message").val("").trigger("keyup");
// };

// var isJoinMessage = function (val) {
//   return joinRegex.test(val);
// };
// var notJoinMessage = function (val) {
//   return !isJoinMessage(val);
// };

// var renderOnline = function (allUsers) {
//   return allUsers.map(usersTemplate);
// };


// // Setup observables
// var message = bacon.fromEventTarget(chat, 'message');
// var errors = bacon.fromEventTarget(chat, 'error');
// var users = bacon.fromEventTarget(chat, 'join');
// var usersIn = bacon.fromPromise($.ajax("/users"))
// var part = bacon.fromEventTarget(chat, 'part')
//   .filter(function (user) {
//     return !!user;
//   });


// var partHtml = part
//   .map(toUserObject)
//   .map(partingTemplate);

// part.onValue(function (user) {
//   $(".user[data-user='"+user+"']").remove();
// });

// var errorHtml = errors
//   .map(errorTemplate);

// usersIn
//   .map(renderOnline)
//   .assign($('.users'), 'html');

// var newMessages = message
//   .map(messageTemplate)
//   .merge(partHtml)
//   .merge(errorHtml);

// newMessages
//   .scan('', sum)
//   .assign($('.discussion'), 'html')

// var newUser = users
//   .map(toUserObject)
//   .map(usersTemplate)
//   .onValue(function (el) {
//     $('.users').append(el);
//   })


// // ---


// var enter = bacon
//   .fromEventTarget($('#input-message'), 'keydown')
//   .filter(function (e) {
//     return e.keyCode === 13;
//   })
//   .doAction('.preventDefault')

// var message = bacon
//   .fromEventTarget($('#input-message'), 'keyup');

// var sentMessage = message
//   .map(function (event) {
//     return event.currentTarget.value;
//   })
//   .toProperty()
//   .sampledBy(enter);

// var messageSent = sentMessage
//   .filter(notJoinMessage)
//   .doAction(function (val) {
//     chat.message(val);
//   });

// var userJoined = sentMessage
//   .filter(isJoinMessage)
//   .map(function (val) {
//     var match = joinRegex.exec(val);
//     return match[1];
//   })
//   .doAction(function (val) {
//     chat.join(val);
//   });

// messageSent
//   .merge(userJoined)
//   .doAction(resetForm)
//   .onError(function (err) {
//     console.log('Error', err);
//   });

// // ---




// // var newMessages = message
// //   .map(messageTemplate)
// //   .merge(partHtml)
// //   .merge(errorHtml);



// newMessages
//   .map(function () {
//     return $('.discussion-wrap')[0].scrollHeight;
//   })
//   .assign($('.discussion-wrap'), 'scrollTop')


