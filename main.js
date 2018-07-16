// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const {execSync, exec, fork} = require('child_process')
const fs = require('fs')


const path = require('path')
const DecisionTree = require('decision-tree')
const reader = require('./reader')
const FILE_NAME = 'PlayerPersonalDataM.csv'
const _ = require('lodash')

const EURO = '€';
const MIL = 'M';
const K = 'K';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 400, height: 390})

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

function isNumeric(num){
  return !isNaN(num)
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const {ipcMain} = require('electron')
ipcMain.on('close-me', (evt, arg) => {
  app.quit()
})

ipcMain.on('startPredict', (evt, arg) => {
  const {nationality, age, overall} = arg
  getData(nationality, age, overall)
})


async function getData(nationality, age, overall) {
  let training_data = await reader.readCsvFile(path.join(__dirname, FILE_NAME))
  _.each(training_data, (value, key) => {
      _.each(value, (v, k) => {
          if (isNumeric(v)) {
              value[k] = + v
          }
          if (_.includes(v, MIL)) {
              value[k] = (+_.replace(_.replace(v, MIL, ''), EURO, '')) * 1000
          }
          if (_.includes(v, K)) {
              value[k] = _.replace(_.replace(v, K, ''), EURO, '')
          }
      })
  })
  const features = ["Age", "Overall"];
  const class_name = "Value";
  const dt = new DecisionTree(training_data, class_name, features);
  let predicted_class = dt.predict({
      Age: age,
      Overall: overall
  });
  console.log(predicted_class + K + ' ' + EURO)
}


















