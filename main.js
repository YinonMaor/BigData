const DecisionTree = require('decision-tree')
const reader = require('./reader')
const path = require('path')
const FILE_NAME = 'PlayerPersonalData.csv'
const _ = require('lodash')

const EURO = '€';
const MIL = 'M';
const K = 'K';

function isNumeric(num){
    return !isNaN(num)
}

async function getData() {
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
        Age: 19,
        Overall: 90
    });
    console.log(predicted_class + K + ' ' + EURO)
}
getData()