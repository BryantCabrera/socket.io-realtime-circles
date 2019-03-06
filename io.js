// io.js

const io = require('socket.io')();

// object to hold player's initials as keys
let players = {};

// Listen for new connections from clients (socket)
io.on('connection', function (socket) {
    console.log('Client connected to socket.io!');
    //listener for register
    socket.on('register-player', function (initials) {
        // each socket has a unique id
        players[socket.id] = initials;
        io.emit('update-player-list', Object.values(players));
    });

    //listener for when player clicks 'addCircle' button
    socket.on('add-circle', function (data) {
        io.emit('add-circle', data);
    });

    //listener for when player clicks 'clear' button
    socket.on('clear', function (data) {
        io.emit('clear', data);
    });

    //listener for when player disconnects
    socket.on('disconnect', function () {
        delete players[socket.id];
        io.emit('update-player-list', Object.values(players));
    });
});

// io represents socket.io on the server - let's export it
module.exports = io;