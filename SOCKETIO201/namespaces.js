const express = require('express');
const socketio  = require('socket.io');
const app = express();

app.use(express.static(__dirname + '/public'));

const PORT = 8666;
const expressServer  = app.listen(PORT, () =>  {
    console.log("Port running on port: ", PORT);
});

const io = socketio(expressServer);

// connect or connection
io.of('/').on('connect', (socket) => {
    socket.join('chat');
    io.of('/').to('chat').emit('welcomeToChatRoom', {});

    io.of('/admin').emit('userJoinedMainNS', "");

    console.log(socket.id, "has connected");
        socket.emit('messageFromServer', {data: 'Welcome to the socket server 👯‍♀️👯‍♀️'});
        socket.on('messageFromClient', (data) => {
            console.log(data);
        });

        socket.on('typing', () =>  {
            console.log('User is typing...');
        });

        socket.on('new-message', (data) => {
            console.log(data);

            io.emit('newMessageToClients', {text: data.newMessage})
        })
})

io.of('/admin').on('connect', (socket) => {
    console.log(socket.id, "has connected to Admin");

    })