const express = require('express');
const socketio  = require('socket.io');
const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = 9000;
const expressServer  = app.listen(PORT, () =>  {
    console.log("Port running on port: ", PORT);
});

const io = socketio(expressServer);

// connect or connection
io.on('connect', (socket) => {

    socket.emit('Welcome', 'Welcome to the socket server 👯‍♀️👯‍♀️');
    socket.on('clientConnect', () => {
        console.log(socket.id, "has connected");
    })
});

