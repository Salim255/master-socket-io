const joinRoom = (roomName, namespaceId) => {
    console.log(roomName, namespaceId);
    namespaceSocket[namespaceId].emit('joinRoom', roomName, (ackResp) => {
        console.log(ackResp, "From Join room");

        // class="curr-room-text"
        const currentRoomName = document.querySelector('.curr-room-text');
        currentRoomName.innerHTML = `${roomName}`
        // curr-room-num-users
        const usersNumContainer = document.querySelector('.curr-room-num-users');

        // Users <span class="fa-solide fa-user"></span></span>
        usersNumContainer.innerHTML = `${ackResp.numUsers} <span class="fa-solid fa-user"></span></span>`
    });
}