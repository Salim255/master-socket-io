const joinRoom = async (roomName, namespaceId) => {
    console.log(roomName, namespaceId);
    // V2
    const ackResp =  await namespaceSockets[namespaceId].emitWithAck('joinRoom', roomName)
    console.log(ackResp, "Hello ⛑️⛑️");
    // class="curr-room-text"
    const currentRoomName = document.querySelector('.curr-room-text');
    currentRoomName.innerHTML = roomName;
    // curr-room-num-users
    const usersNumContainer = document.querySelector('.curr-room-num-users');

    // Users <span class="fa-solid fa-user"></span></span>
    usersNumContainer.innerHTML = `${ackResp.numUsers} <span class="fa-solid fa-user"></span></span>`

    /*  V1   namespaceSocket[namespaceId].emit('joinRoom', roomName, (ackResp) => {
        console.log(ackResp);
        // class="curr-room-text"
        const currentRoomName = document.querySelector('.curr-room-text');
        currentRoomName.innerHTML = `${roomName}`
        // curr-room-num-users
        const usersNumContainer = document.querySelector('.curr-room-num-users');

        // Users <span class="fa-solid fa-user"></span></span>
        usersNumContainer.innerHTML = `${ackResp.numUsers} <span class="fa-solid fa-user"></span></span>`
    }); */
}