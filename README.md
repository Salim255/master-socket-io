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

# Packets Layer
    In networking, data is transmitted over network in the form of packets. These packets traverse through multiple layers of the OSI (Open System Interconnection) or TCP/IP model. Each layer has a specific function and adds its own header (and sometimes trailer) to the packets, encapsulating the data as it moves down the layers.

## OSI Model Layers:
### 1) Application Layer (Layer 7):
#### Function 1:
    Interfaces with the end-user and provides network services directly to applications. Examples HTTP, FTP, SMTP, and DNS

#### Data Encapsulation 2:
    Data (message or payload)

### Presentation Layer (Layer 6) :
#### Function 1 :
    Translates, encrypts, and compress data for the application layer. Ensure that data is in readable format for the application.
#### Data Encapsulation Data 2:
    Data

### Session Layer (Layer 5):
#### Function 1:
    Manages and control the connections between computers. Establishes, maintains, and terminates sessions.
#### Data Encapsulation:
    Data

### Transport Layer (Layer 4):
#### Function 1:
    Provides reliable data transfer with error recovery and flow control. Ensures complete data transfer. Key protocols: TCP and UDP.

#### Data Encapsulation 2:
    Segment (TCP) or Datagram (UDP).

#### Header Added 3:
    Source and destination port numbers, sequence and acknowledgment numbers, error-checking data.

### Network Layer (Layer 3):
#### Function 1:
    Determine the best physical path for data to travel from source to destination.
#### Data Encapsulation 2:
    Packet
#### Headers Added 3:
     Source and destination IP address, TTL (Time to Live), protocol type.

### Data Link Layer (Layer 2):
#### Function 1:
     Handles the physical addressing and access to the physical medium. Ensures error-free transfer of data frames between nodes on the same network.
#### Data Encapsulation 2:
    Frame

#### Headers Added 3:
    MAC (Media Access Control) addresses, frame type, error-checking data (CRC)

### Physical Layer (Layer 1):
#### Function 1:
    Transmits raw bitstreams over a physical medium such as cables, radio waves, or optical fibers. Defines the hardware equipment involved
#### Data Encapsulation 2:
    Bits

# TCP / UDP
TCP and UDP are two core protocols of the internet Protocol Suite. They serve different purposes and have distinct characteristics suited for different types of network communication.

## TCP
    Transmission Control Protocol
### Characteristics:
- 1) Connection-oriented:
    - TCP establishes a connection between the sender and receiver before data transmission begins. The connection maintained through the session.

- 2) Reliable:
    - TCP ensures reliable delivery of data. It uses acknowledgment to confirm that data has been received and retransmits lost packets.

- 3) Ordered :
    - TCP ensure that packets are delivered in the same order they were sent. If packets arrive out of order , TCP rearranges them before passing them to the application layer.

- 4) Error Checking :
    - TCP performs error-checking using checksums and ensures data integrity. If a packet is corrupted, it is retransmitted.
- 5) Flow Control :
    - TCP uses flow control mechanisms to prevent the sender from overwhelming the receiver with too much data at once.

- 6) Congestion Control:
    - TCP has built-in congestion control to avoid network congestion bty adjusting the rare of data transmission based on network.

### Use Cases:
- Web Browsing: Ensure that web pages are loaded completely and correctly.
- Email: Reliable and ordered delivery  of emails .
- File transfers: Ensures complete and accurate file transfers.

## UDP
    User Datagram Protocol
### Characteristics:
- 1) Connectionless:
    - UDP does not establish a connection before sending data. Each packets is sent independently.
- 2) Unreliable:
    - UDP does not guarantee delivery of packages. There are no acknowledgments, and lost packets are not retransmitted.
- 3) No Order guarantee:
    - The UDP does not guarantee that packets are delivered in order. Packets may arrive of order, or not all.
- 4) Minimal Overhead:
    - UDP has less overhead compared to TCP because it does not provide reliability, ordering, or flow control. This makes it faster and more efficient for certain applications.
- 5) Error checking:
    - UDP uses checking for error-checking, but if a packet is corrupted, it is simply discarded.

### Use case UDP
- Streaming Media: Video and audio streaming where some packet loss is acceptable, and low latency is crucial.
- Online Gaming: Real-time multiplayer games where speed is more important than perfect delivery is crucial.

##
# Pre-Socket.IO

## Transport Connection Protocol
# Why  Socket.IO ?