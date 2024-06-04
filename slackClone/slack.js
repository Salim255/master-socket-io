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
        //console.log(`${socket.id} has connected to `,namespace.endpoint);
        socket.on('joinRoom', async (roomName, ackCB) => {
            // Need to fetch the history

            // Leave all rooms (except own room), because the client can only be in one room.
            const rooms = socket.rooms;
            let i = 0 ;
            rooms.forEach(room => {
                // We don't want to leave the socket's personal room, which is guaranteed to be first;
                if (i !== 0) {
                    socket.leave(room);
                }
                i++;
            })
            // Join the room!
            // Note , roomName is coming from the client. Which is not safe.
            // Auth to make sure that the user has the right to join room
            socket.join(roomName);
            // Fetch the number of sockets (users) in this room
            const sockets = await io.of(namespace.endpoint).in(roomName).fetchSockets();
            const socketCount =  sockets.length;
            ackCB({
                numUsers: socketCount
            })
        });

        socket.on('newMessageToRoom',  (messageObj) => {
            console.log(messageObj);

            // The sever now has to broadcast this to all connected clients to this room only

            // How we can find out what room THIS socket is in ?
            const rooms = socket.rooms;
            const currentRoom = [...rooms][1] // This is aset!! Not array;

            // Send Out this messageObj to everyone including the sender
            io.of(namespace.endpoint).in(currentRoom).emit('messageToRoom', messageObj);

        })
    })
})