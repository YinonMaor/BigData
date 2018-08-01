
const path = require('path');
const fs = require('fs');
const hdfs = require('./client');
//const WebHDFS = require('webhdfs');
//const hdfs = WebHDFS.createClient();

console.log('0');
const localDataFile = fs.createReadStream(path.join(__dirname, 'PlayerPersonalDataM.csv'));
console.log('1');
const remoteDataFile = hdfs.createWriteStream('/data/PlayerPersonalDataM.csv');
console.log('2');
localDataFile.pipe(remoteDataFile);

console.log('3');

remoteDataFile.on('error', err => {
    console.log(err);
    throw err;
});

remoteDataFile.on('finish', () => {
    process.stdout('Finished');
});
