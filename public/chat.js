// establish connection with server
// Make connection
var socket = io.connect("http://localhost:4000"); // socket for front end

// Query dom
var message = document.getElementById('message');
var user = document.getElementById('user');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');



// Emit event when someone sends WHEN button is pressed
btn.addEventListener('click', function() { // when user clicks
    // 1st param is what type of message
    // 2nd param object sent to server
    socket.emit('chat', {
        message: message.value,
        user: user.value
    }); // emit message from client to backend 
});

// emit event when user is typing
message.addEventListener('keypress', function() {
    socket.emit('typing', user.value)
});

// listen for events for any changes of new messages sent
socket.on('chat', function(data) {
    feedback.innerHTML = ''; // remove user is typing
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
});

// Listens for any event changes of other users typing
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
