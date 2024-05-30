
const joinNs = (element, nsData) => {

    const nsEndpoint = element.getAttribute('ns');
    const clickedNs = nsData.find(ns => ns.endpoint === nsEndpoint);
    const rooms = clickedNs.rooms;

    // Get the room-list div
    let roomList = document.querySelector('.room-list');
    // Clear it out
     roomList.innerHTML = "";

    // Loop through
    for (let i = 0; i < rooms.length; i++) {
        roomList.innerHTML +=
        `<li><span class="glyphicon glyphicon-lock"></span>${rooms[i].roomTitle}</li>`
    };

    localStorage.setItem('lastNs', nsEndpoint)
}

