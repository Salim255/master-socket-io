
/* const userName = prompt('What is user name? ');
const password = prompt('What is your password'); */

const userName = "";
const password = "";

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
    const lastNs = localStorage.getItem('lastNs');
    console.log(lastNs);

    const namespacesDiv = document.querySelector('.namespaces');
    namespacesDiv.innerHTML = "";
    nsData.forEach(ns => {
        // Update the HTML with each ns
        const namespacesDiv = document.querySelector('.namespaces');
        namespacesDiv.innerHTML +=
            `<div class='namespace' ns="${ns.endpoint}">
                <img src="${ns.image}"/>
            </div>`
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
