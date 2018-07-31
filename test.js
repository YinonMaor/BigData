//const {MongoClient, ObjectID} = require('mongodb');
const path = require('path');
const fs = require('fs');
const hdfs = require('./client');

//const mongoURL = '';

const localDataFile = fs.createReadStream(path.join(__dirname, 'PlayerPersonalDataM.csv'));

const remoteDataFile = hdfs.createWriteStream('somePath');

localDataFile.pipe(remoteDataFile);

remoteDataFile.on('error', err => {
    throw err;
});

remoteDataFile.on('finish', () => {
    process.stdout('Finished');
});