const csv = require("csvtojson");

module.exports = {
    readCsvFile(filePath) {
        return new Promise(resolve => {
            const players = []
            csv
            .fromPath(filePath)
            .on("data", data => {
                players.push(data)
            })
            .on("end", () => {
                console.log("done reading data from csv")
                resolve(players)
            })
        })
    },
    read(csvFilePath) {
        return new Promise(resolve => {
            csv()
            .fromFile(csvFilePath)
            .then(function(jsonArrayObj){
                resolve(jsonArrayObj)
            })
        })
    }
};


