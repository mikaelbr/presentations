var _ = require('lodash');

var onlineUsers = [];

module.exports = {
  route: function (req, res) {
    if (req.method !== "GET" || !/^\/users$/i.test(req.url)) {
      return false;
    }

    var users = JSON.stringify(onlineUsers);
    res.writeHead(200, {
      'Content-Length': users.length,
      'Content-Type': 'application/json'
    });
    res.end(users);
    return true;
  },

  add: function (user) {
    return onlineUsers.push({
      username: user
    });
  },

  remove: function (username) {
    _.remove(onlineUsers, function (user) {
      return user.username === username;
    });
  }
}