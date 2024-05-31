const express = require('express');
const socketio  = require('socket.io');
const app = express();

const namespaces = require('./data/namespaces')
const Room = require('./classes/Room')

app.use(express.static(__dirname + '/public'));

const PORT = 9000;
const expressServer  = app.listen(PORT, () =>  {
    console.log("Port running on port: ", PORT);
});

const io = socketio(expressServer);

// Manufactured way to change a namespace (without building a huge UI)
app.get('/change-ns', (req, res) => {
    // Update the namespaces array
    namespaces[0].addRoom(new Room(0, 'Deleted', 0));

    // Let everyone knows that this namespace has changed
    io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0])
    res.json(namespaces[0])
})

// connect or connection
io.on('connect', (socket) => {

    socket.emit('Welcome', 'Welcome to the socket server 👯‍♀️👯‍♀️');
    socket.on('clientConnect', () => {
        console.log(socket.id, "has connected");
    });

    socket.emit('nsList', namespaces);
});

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on('connect', (socket) => {
        console.log(`${socket.id} has connected to `,namespace.endpoint);
    })
})