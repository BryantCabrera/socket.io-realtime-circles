// io.js

var io = require('socket.io')();

// Listen for new connections from clients (socket)
io.on('connection', function (socket) {
    console.log('Client connected to socket.io!');
    socket.on('add-circle', function (data) {
        io.emit('add-circle', data);
    });
});

// io represents socket.io on the server - let's export it
module.exports = io;