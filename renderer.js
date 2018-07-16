// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {ipcRenderer} = require('electron');

const startPredict = document.getElementById('clickButton');
startPredict.addEventListener('click', () => {
    const age         = document.getElementById('age').value;
    const nationality = document.getElementById('nationality').value;
    const overall     = document.getElementById('overall').value;
    ipcRenderer.send('startPredict', {nationality, age, overall})
});

const closeApp = document.getElementById('closeButton');
closeApp.addEventListener('click', () => {
    ipcRenderer.send('close-me')
});

ipcRenderer.on('prediction', (event, prediction) => {  
    document.getElementById('prediction').innerHTML = prediction
});