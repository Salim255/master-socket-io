const joinRoom = (roomName, namespaceId) => {
    console.log(roomName, namespaceId);
    namespaceSocket[namespaceId].emit('joinRoom', roomName)
}