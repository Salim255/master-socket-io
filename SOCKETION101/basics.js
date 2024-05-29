// 3rd party module from npm
const express = require('express');
const app = express();
const socketio = require('socket.io')

// This makes that if anything comes here, anything inside the public folder will render
app.use(express.static(__dirname + '/public'));

/* app.use('/', (req, res) => {
    console.log('====================================');
    console.log(req);
    console.log('====================================');
    res.send('Hello wold')
}); */

let PORT = 4555;
const expressServer = app.listen(PORT, () => {
    console.log('====================================');
    console.log("Server running on port: ", PORT);
    console.log('====================================');
})

const io = socketio(expressServer);
// io is the entire socket.io sever
io.on('connection', (socket) => {
    // Socket is individual socket, so here we check the connection of the socket to our socket.io sever
    console.log(socket.id, 'Has connected', new Date());
    // In ws we use "send" in order to create event , and in socket.io we use "emit"
    socket.emit('messageFromSalim', {data: 'Hello from Salim sever'});

    socket.on('messageFromClient', (data) => {

        console.log(data);

    });


// In the sever side we are interaction with one socket that connected to the server
});
