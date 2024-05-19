# master-socket-io
- Socket.IO is a library that enable low-latency( Without having to poll the server to replay ), bidirectional(two-way) and event-based(event responses) communication between a client and server

- WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, we can send messages to server and receive event-driven response without having to poll the server for a reply

## Whats socket.IO is not ?
- Socket.IO is NOT a WebSocket implementation
- Although Socket.IO indeed use WebSocket for transport when possible, it adds additional metadata to each packet. Thats why a WebSocket client will not be able to successfully connect to socket.IOserver, and a Socket.IO client will not be able to connect to plain WebSocket server either.

## Socket.IO Features :
- Here are the feature provided by Socket.IO over plain WebSockets:
### HTTP log-polling fallback:
- The connection will fall back to HTTP log-polling in case the WebSocket connection can't be established; This feature was the main reason why people use Socket.IO when the project created more than ten years ago, as the browser support for WebSocket was still in its infancy

### Automatic reconnection:
- Under some particular conditions, the WebSocket connection between the server and the client can be interrupted with both sides being unaware of the broken state of the link.

That's why Socket.IO includes a heartbeat mechanism, which periodically checks the status of the connection.

### Packet buffering:
The packets are automatically buffered when the client is disconnected, and will be sent upon reconnection.

### Acknowledgements:
Socket.IO provides a connection way to send an event and receive a response.

### Broadcasting:
On the server-side, you can send an event to all connected clients or to a subset of clients.

### Multiplexing:
Namespaces allow you to split the logic of your application over a single shared connection. This can be useful for example if you want to create an "admin" channel that only authorized users can join
