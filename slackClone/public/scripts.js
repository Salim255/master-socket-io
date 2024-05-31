
/* const userName = prompt('What is user name? ');
const password = prompt('What is your password'); */

const userName = "";
const password = "";

// Always join the main namespace, because that's where the client gets the namespaces from
const socket = io('http://localhost:9000');

// Sockets will put into this array, in the index of their ns.id
const namespaceSocket = [];
const listener = {
    nsChange :[],
}
const addListener = (nsId) => {
    if (!listener.nsChange[nsId]) {
        namespaceSocket[nsId].on('nsChange', (data) => {
            console.log("Namespace Changed");
            console.log(data);
        })
        listener.nsChange[nsId] = true;
    } else {
        // Nothing to do the listener has been added
    }
}

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

        if (!namespaceSocket[ns.id]) {
            // There is no socket at this nsId. So make a new reconnection!
            // Join this namespace with io()
            namespaceSocket[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
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
        joinNs(document.getElementsByClassName('namespace')[0], nsData);
    }
})
