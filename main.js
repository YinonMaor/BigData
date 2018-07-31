// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');

const path = require('path');
const DecisionTree = require('decision-tree');
const reader = require('./reader');
const FILE_NAME = 'PlayerPersonalDataM.csv';
const _ = require('lodash');
const { fork, execSync } = require('child_process');
const PORT = 3600;

const EURO = '€';
const MIL = 'M';
const K = 'K';

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 520, height: 520});
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let ip = '127.0.0.1';

require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        throw err;
    }
    ip = add;
});

const server = fork(path.join(__dirname, 'Server/Server'), ['--port', PORT]);

function isNumeric(num){
  return !isNaN(num);
}

const {ipcMain} = require('electron');
ipcMain.on('close-me', (/* evt, arg */) => {
  server.kill('SIGTERM');
  app.quit();
});

ipcMain.on('startPredict', (evt, arg) => {
  const {nationality, age, overall} = arg;
  getData(nationality, age, overall);
});

ipcMain.on('viewData', () => {
    execSync(`open -a "Google Chrome" http://${ip}:${PORT}`);
});


async function getData(nationality, age, overall) {
  const training_data = await reader.readCsvFile(path.join(__dirname, FILE_NAME));
  _.each(training_data, value => {
      _.each(value, (v, k) => {
          if (isNumeric(v)) {
              value[k] = + v;
          }
          if (_.includes(v, MIL)) {
              value[k] = +_.replace(_.replace(v, MIL, ''), EURO, '') * 1000;
          }
          if (_.includes(v, K)) {
              value[k] = _.replace(_.replace(v, K, ''), EURO, '');
          }
      });
  });
  const features = ['Age', 'Overall'];
  const class_name = 'Value';
  const dt = new DecisionTree(training_data, class_name, features);
  const predicted_class = dt.predict({
      Age: age,
      Overall: overall
  });
  mainWindow.webContents.send('prediction', predicted_class + K + ' ' + EURO);
}


















