
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
        console.log('====================================');
        console.log(ns.image);
        console.log('====================================');
        // Update the HTML with each ns
        const namespacesDiv = document.querySelector('.namespaces');
        namespacesDiv.innerHTML +=
            `<div class='namespace' ns="${ns.ns}">
                <img src="${ns.image}"/>
            </div>`
    });
})
