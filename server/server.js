var express = require('express');

var app = express();

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

var port = process.env.port || 3000;
var server = app.listen(port, function() {
  console.log('Server listening on port: ' + port);
});

var io = require('socket.io')(server);

io.on('connection', function(socket) {
  console.log('Socket connected!');
  socket.on('createPlurb', function(data) {
    console.log(data);
  });
});

module.exports = app;
