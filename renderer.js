/* eslint-env browser */
const {ipcRenderer} = require('electron');

const startPredict = document.getElementById('clickButton');
startPredict.addEventListener('click', () => {
	const age         = document.getElementById('age').value;
	const nationality = document.getElementById('nationality').value;
	const overall     = document.getElementById('overall').value;
	ipcRenderer.send('startPredict', {nationality, age, overall});
});

const showButton = document.getElementById('showButton');
showButton.addEventListener('click', () => {
    const radios = document.getElementsByName('os');
    let val = null;
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            val = radios[i].value;
            break;
        }
    }
    ipcRenderer.send('viewData', {val});
});

const downloadHDFS = document.getElementById('downloadHDFS');
downloadHDFS.addEventListener('click', () => {
    document.getElementById('downloadHDFS').disabled = true;
    ipcRenderer.send('downloadHDFS');
});

const closeApp = document.getElementById('closeButton');
closeApp.addEventListener('click', () => {
	ipcRenderer.send('close-me');
});

ipcRenderer.on('prediction', (event, prediction) => {
	document.getElementById('prediction').innerHTML = prediction;
});