
var io = require('socket.io-client');
var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var humanize = require('humanize');
var _ = require('lodash');

var reemit = function (client, type) {
  return function () {
    var args = _.toArray(arguments);
    args.unshift(type)
    client.emit.apply(client, args);
  }
};

var Chat = function () {
  this.connected = false;
  var client = this;
  client.socket = io.connect();

  client.socket.on('connect', function(){
    client.connected = true;
    client.emit('connected');
  });
  client.socket.on('message', reemit(client, 'message'));
  client.socket.on('part', reemit(client, 'part'));
  client.socket.on('join', reemit(client, 'join'));
  return client;
};
inherits(Chat, EventEmitter);

Chat.prototype.join = function (username) {
  if (!this.connected) {
    return this.emit('error', new Error('Not connected yet.'));
  }
  if (this.username) {
    return this.emit('error', new Error('Already connected and logged in as ' + this.username));
  }

  this.username = username;
  this.socket.emit('join', username);
  this.emit('join', username);
  return this;
};

Chat.prototype.message = function (message) {
  if (!this.connected || !this.username) {
    return this.emit('error', new Error('Not connected yet. Join by using /join <username>'));
  }
  if (!message) {
    return this.emit('error', new Error('No message given.'));
  }
  var data = {
    username: this.username,
    message: message,
    time: humanize.date('d.m.Y - H:i:s')
  };
  this.socket.emit('message', data);
  this.emit('message', data);
  return this;
};

var chat = module.exports = new Chat();