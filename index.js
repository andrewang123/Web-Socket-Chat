// THE BACK END
// imports
var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express(); 
var server = app.listen(4000, function() {
    console.log("Listening on port: 4000");
});


// Static files
app.use(express.static('public'));


// Socket Setup on the backend
var io = socket(server); // param is what server we want to work with, this server

    // listen to the connection
    // listen to event called connection
    // callback function fires up
io.on('connection',function (socket) { // socket is between client and server
    console.log("made socket connection", socket.id);
    // Listeners :

    // DISPLAYS EVERYWHERE TO OWN AND ALL THE OTHER CLIENTS
    // When message is sent : get the message that we just sent and emit it to everyone
    // .sockets refers to all the sockets on the server
    socket.on('chat', function(data){ // when recieved chat message with data
        io.sockets.emit('chat', data); // all of the sockets on the server
    });

    // DISPLAY TO EVERYONE EXCEPT FOR SELF
    socket.on('typing', function(data){ // displays when the user it typing
        socket.broadcast.emit('typing', data); // individual socket
    });


});