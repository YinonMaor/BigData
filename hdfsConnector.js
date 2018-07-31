const path = require('path');
const fs = require('fs');
const hdfs = require('./client');

const localDataFile = fs.createReadStream(path.join(__dirname, 'PlayerPersonalDataM.csv'));

const remoteDataFile = hdfs.createWriteStream('try/PlayerPersonalDataM.csv');

localDataFile.pipe(remoteDataFile);

remoteDataFile.on('error', err => {
    throw err;
});

remoteDataFile.on('finish', () => {
    process.stdout('Finished');
});