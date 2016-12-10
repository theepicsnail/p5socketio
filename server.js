// Setup the server (and socketio), use 'static' for files, listen on port 12345
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static('.'));
http.listen(12345, function() { console.log('listening on *:12345'); });

// Setup the server to handle connect/disconnect.
io.on('connection', function(socket) {
  addUser(socket);
  socket.on('disconnect', function() { removeUser(socket); });
});

// Server logic!
var users = {}; // Map of id->mouse pos

function addUser(socket) {
  console.log("Add", socket.id);
  users[socket.id] = {x : 0, y : 0};

  socket.on('mouse update', function(newPos) {
    users[socket.id] = newPos;
    socket.broadcast.emit('players update', users);
  });
}

function removeUser(socket) {
  delete users[socket.id]
  console.log("Rem", socket.id);
}
