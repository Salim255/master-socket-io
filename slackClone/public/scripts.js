
const socket = io('http://localhost:9000');

socket.on('connect', () => {
    console.log('Connected');
    socket.emit('clientConnect')
});

socket.on('Welcome', (data) =>  {
    console.log(data);
})
