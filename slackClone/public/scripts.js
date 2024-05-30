
const userName = prompt('What is user name? ');
const password = prompt('What is your password')

const socket = io('http://localhost:9000');

socket.on('connect', () => {
    console.log('Connected');
    socket.emit('clientConnect')
});

socket.on('Welcome', (data) =>  {
    console.log(data);
});

// Listen to nsList event from the server which gives us the namespaces
let ns;
socket.on('nsList', (nsData) => {
    console.log(nsData);
    nsData.forEach(ns => {
        // Update the HTML with each ns
        const namespacesDiv = document.querySelector('.namespaces');
        namespacesDiv.innerHTML +=
            `<div class='namespace' ns="${ns.endpoint}">
                <img src="${ns.image}"/>
            </div>`
    });

    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        console.log(element);
        element.addEventListener('click', (e) => {
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

                console.log('====================================');
                console.log( rooms[i]);
                console.log('====================================');
            }
        })
    });
})
