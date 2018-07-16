const DecisionTree = require('decision-tree')
const reader = require('./reader')
const path = require('path')
const FILE_NAME = 'PlayerPersonalData.csv'

async function getData() {
    let training_data = await reader.read(path.join(__dirname, FILE_NAME))
    training_data = training_data.slice(0, 5)
    const features = ["Age", "Nationality", "Overall"];
    const class_name = "Special";
    const dt = new DecisionTree(training_data, class_name, features);
    var treeModel = dt.toJSON();
    console.log(treeModel)
}
getData()
//
// var test_data = [
//     {"color":"blue", "shape":"hexagon", "liked":false},
//     {"color":"red", "shape":"hexagon", "liked":false},
//     {"color":"yellow", "shape":"hexagon", "liked":true},
//     {"color":"yellow", "shape":"circle", "liked":true}
// ];

// var class_name = "liked";

// var features = ["color", "shape"];

// var dt = new DecisionTree(training_data, class_name, features);

// var predicted_class = dt.predict({
//     color: "blue",
//     shape: "hexagon"
// });

// //var accuracy = dt.evaluate(test_data);

// var treeModel = dt.toJSON();

// console.log(treeModel);