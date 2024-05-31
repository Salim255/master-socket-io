
// We could ask the server for fresh info on this NS. BAD!!
// We have socket.io/ws, and the server will tell us when something has happened

const joinNs = (element, nsData) => {

    const nsEndpoint = element.getAttribute('ns');
    const clickedNs = nsData.find(ns => ns.endpoint === nsEndpoint);
    const rooms = clickedNs.rooms;

    // Get the room-list div
    let roomList = document.querySelector('.room-list');
    // Clear it out
     roomList.innerHTML = "";

    // Loop through
    rooms.forEach(room =>  {
        console.log(room);
        roomList.innerHTML +=
        `<li class="room" namespaceId=${room.namespaceId}>
            <span class="fa-solid fa-${room.privateRoom ?  'lock' : 'globe'}"></span>${room.roomTitle}
        </li>`
    })

    // Add click listener to each room, so the client can tell the server it wants to join!
    const roomNodes = document.querySelectorAll('.room');

    Array.from(roomNodes).forEach(element => {
        element.addEventListener('click', (e) => {
            console.log('Someone click on '+e.target.innerText);
            const namespaceId = element.getAttribute('namespaceId')
            joinRoom(e.target.innerText, namespaceId);
        })
    })
    localStorage.setItem('lastNs', nsEndpoint)
}

