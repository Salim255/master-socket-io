
/* const userName = prompt('What is user name? ');
const password = prompt('What is your password'); */

const userName = "";
const password = "";

// Always join the main namespace, because that's where the client gets the namespaces from
const socket = io('http://localhost:9000');

// Sockets will put into this array, in the index of their ns.id
const namespaceSockets = [];
const listener = {
    nsChange :[],
    messageToRoom: []
}

// A global variable we can update when the user clicks on a namespace
// We will use it to broadcast across the app (redux would be great here ...)
let selectedNsId = 0;

// Add a submit handler for our form
document.querySelector('#message-form').addEventListener('submit', (e) => {
    // Keep the browser from submit behavior
    e.preventDefault();

    // Grab the massage value from the input box
    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage, selectedNsId,  namespaceSockets[selectedNsId]);
    namespaceSockets[selectedNsId].emit('newMessageToRoom', {
     newMessage,
     date: Date.now(),
     avatar:"https://via.placeholder.com/30"
    })
});

// Addlistener's job is to manage all listeners added to all namespaces.
// This prevent listeners added multiple times and makes life
// Better for us as developers
const addListener = (nsId) => {
    if (!listener.nsChange[nsId]) {
        namespaceSockets[nsId].on('nsChange', (data) => {
            console.log("Namespace Changed");
            console.log(data);
        })
        listener.nsChange[nsId] = true;
    }

    if (!listener.messageToRoom[nsId]) {
        // Then this listener need to be added
        // Listen to new message  event
        namespaceSockets[nsId].on('messageToRoom', (messageObj) => {

            document.querySelector('#messages').innerHTML = buildMessageHtml(messageObj);

        });

        listener.messageToRoom[nsId] = true;
    }
}

socket.on('connect', () => {
    console.log('Connected');
    socket.emit('clientConnect');


});


socket.on('Welcome', (data) =>  {
    console.log(data);
});


// Listen to nsList event from the server which gives us the namespaces
let ns;
socket.on('nsList', (nsData) => {
    const lastNs = localStorage.getItem('lastNs');

    const namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach(ns => {
        // Update the HTML with each ns
        const namespacesDiv = document.querySelector('.namespaces');
        namespacesDiv.innerHTML +=
            `<div class='namespace' ns="${ns.endpoint}">
                <img src="${ns.image}"/>
            </div>`

        // Initialize thisNs  as its index nameSpaces.
        // If the connection is new, this will be null
        // If the connection has already been established, it will reconnect and remain in its spot

        if (!namespaceSockets[ns.id]) {
            // There is no socket at this nsId. So make a new reconnection!
            // Join this namespace with io()
            namespaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
        }

        addListener(ns.id);
    });
    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        element.addEventListener('click', (e) => {
            joinNs(element, nsData)
        })
    });

    if (lastNs) {
        Array.from(document.getElementsByClassName('namespace')).forEach(element => {
            const attr = element.getAttribute('ns') ;
            if (attr === lastNs) {
                joinNs( element , nsData);
            }
        });
    } else {
        // If lastNs is set, then grab that element instead of 0
        joinNs(document.getElementsByClassName('namespace')[0], nsData);
    }



})

const buildMessageHtml = (messageObj) =>  {
    return  `<li>
                <div class="user-image">
                    <img src=${messageObj.avatar} />
                </div>
                <div class="user-message">
                    <div class="user-name-time">rbunch <span> ${messageObj.date} pm</span></div>
                    <div class="message-text">${messageObj.newMessage}</div>
                </div>
             </li>`
}
