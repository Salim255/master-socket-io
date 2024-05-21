// http is a core module
const http = require('http');
// ws is a 3rd party module
const websocket = require('ws');

const server = http.createServer( (req, res) => {
    res.end('Hello Salim')
});

const PORT = 4555;
const wss = new websocket.WebSocketServer({server});

wss.on('headers', (headers, req) => {
    console.log(headers.data);
});

wss.on('connection', (ws, req) => {
    // Once connection established we send a message to the other side
    ws.send('welcome to websocket server!!!');

    // We listen to a message from the other side
    ws.on('message',(message)=> {
        console.log(message.toString(), '💃🏾💃🏾');
    })

});

server.listen(PORT)