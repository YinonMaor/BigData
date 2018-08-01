const request = require('request');
const path = require('path');
const fs = require('fs');

const filename = 'PlayerPersonalDataM.csv';

const target = 'http://localhost:50075/webhdfs/v1/test/maormaor?op=CREATE&user.name=root&namenoderpcaddress=99bd1f952b8a:9000&overwrite=false' + path.basename(filename);

const rs = fs.createReadStream(path.join(__dirname, filename));
const ws = request.post(target);

ws.on('drain', () => {
    console.log('drain', new Date());
    rs.resume();
});

rs.on('end', () => {
    console.log('uploaded to ' + target);
});

ws.on('error', err => {
    console.error('cannot send file to ' + target + ': ' + err);
});

rs.pipe(ws);
/*
const path = require('path');
const fs = require('fs');
const hdfs = require('./client');
//const WebHDFS = require('webhdfs');
//const hdfs = WebHDFS.createClient();

console.log('0')
const localDataFile = fs.createReadStream(path.join(__dirname, 'PlayerPersonalDataM.csv'));
console.log('1')
const remoteDataFile = hdfs.createWriteStream('/data/PlayerPersonalDataM.csv');
console.log('2')
localDataFile.pipe(remoteDataFile);

console.log('3')

remoteDataFile.on('error', err => {
    console.log(err);
    throw err;
});

remoteDataFile.on('finish', () => {
    process.stdout('Finished');
});
*/