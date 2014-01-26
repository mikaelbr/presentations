var $ = require('jquery-browserify'),
    bacon = require('baconjs'),
    chat = require('./chat'),
    _ = require('lodash'),
    template = _.template,
    messageTemplate = template($('#messageTemplate').html()),
    usersTemplate = template($('#usersTemplate').html()),
    partingTemplate = template($('#partingTemplate').html()),
    errorTemplate = template($('#errorTemplate').html());

var joinRegex = /^\/j(?:oin)?\s+([\w]+)/i;

module.exports.sum = function (acc, message) {
  return acc + message;
};

module.exports.toUserObject = function (username) {
  return {
    username: username
  };
};

module.exports.resetForm = function() {
  $("#input-message").val("").trigger("keyup");
};

var isJoinMessage = module.exports.isJoinMessage = function (val) {
  return joinRegex.test(val);
};
module.exports.notJoinMessage = function (val) {
  return !isJoinMessage(val);
};

module.exports.toUsername = function (val) {
  return joinRegex.exec(val)[0];
};

module.exports.renderOnline = function (allUsers) {
  return allUsers.map(usersTemplate);
};

module.exports.toValue = function (event) {
  return event.currentTarget.value;
};

module.exports.template = {
  message: messageTemplate,
  users: usersTemplate,
  parting: partingTemplate,
  error: errorTemplate
};