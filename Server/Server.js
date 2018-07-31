/**
 * Created by Yinon Cohen and Maor Shabtay on 18/12/2017.
 */
'use strict';

/**
 * Dependent modules
 */
const _         = require('lodash');
const fs        = require('fs');
const http      = require('http');
const path      = require('path');
const MongoClient = require('mongodb').MongoClient;

let data = null;

function getDataWithFilter() {
    return new Promise(resolve => {
        const uri = 'mongodb+srv://maorshabtay:YinonMaor123!@playersmdb-f0pam.mongodb.net/test?retryWrites=true';
        MongoClient.connect(uri, async (err, client) => {
            if (err) {
                throw err;
            }
            const collection = await client.db('players').collection('detail');
            collection.find({}).toArray((err, docs) => {
                if (err) {
                    throw err;
                }
                data = docs;
                client.close();
                resolve();
            });
        });
    });
}

function filterDataBy(filter, data) {
    const newArray = _.filter(data, player => {
        let flag = true;
        _.each(filter, (value, key) => {
            if (flag) {
                if (_.isNumber(value)) {
                    value = _.toNumber(value);
                    flag = _.isEqual(_.toNumber(player[key]), value);
                } else {
                    flag = _.isEqual(player[key], value);
                }
            }
        });
        return flag;
    });
    _.each(newArray, (value, key) => {
        newArray[key] = _.omit(newArray[key], ['_id', 'Unnamed: 0', 'Special\r']); // don't use any of them
    });
    return newArray;
}


let PORT    = 3300;
let address = '127.0.0.1';

if (_.includes(process.argv, '--help')) {
    console.log('Usage: node Server [options]\n');
    console.log('Options:');
    console.log('  --port        Define server\'s port argument (3300 by default)');
    process.exit(0);
}

process.argv.forEach((val, index, array) => {
    if (val === '--port' && array[index + 1]) {
        PORT = parseInt(array[index + 1]);
    }
});

const server = http.createServer((req, res) => {
    console.log(`${req.method} request for ${req.url}`);
    console.log(`From: ${req.connection.remoteAddress}`);
    let fileName = req.url;
    if (_.includes(fileName, 'data.json')) {
        const params = fileName.substring(fileName.indexOf('?') + 1).split('&');

        const filter = _.reduce(params, (acc, value) => {
            if (_.includes(value, 'age') || _.includes(value, 'Age')) {
                const age = value.substring(value.indexOf('=') + 1);
                if (age !== '') {
                    acc.Age = _.toNumber(age);
                }
            } else if (_.includes(value, 'nationality') || _.includes(value, 'Nationality')) {
                const nationality = value.substring(value.indexOf('=') + 1);
                if (nationality !== '') {
                    acc.Nationality = nationality;
                }
            }
            return acc;
        }, {});
        fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(filterDataBy(filter, data)), 'utf-8');
        fs.readFile(path.join(__dirname, 'data.json'), (err, data) => {
            if (err) {
                res.writeHead(400, {'Content-type':'application/json'});
                res.end('A trouble occurred with the file.');
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(data);
            }
        });
    } else if (_.includes(fileName, 'app.js')) {
        fileName = 'app.js';
        fs.readFile(path.join(__dirname, fileName), (err, data) => {
            if (err) {
                res.writeHead(400, {'Content-type':'text/javascript'});
                res.end('A trouble occurred with the file.');
            } else {
                res.writeHead(200, {'Content-Type': 'text/javascript'});
                res.end(data);
            }
        });
    } else {
        fileName = 'index.html';
        fs.readFile(path.join(__dirname, fileName), (err, data) => {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'});
                res.end('A trouble occurred with the file.');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }
});

require('dns').lookup(require('os').hostname(), (err, add) => {
    if (err) {
        console.log(err);
    }
    const promise = getDataWithFilter();
    address = add;
    process.stdout.write(`Loading data ...`);
    promise.then(() => {
        server.listen(PORT, address);
        process.stdout.write(`Server is listening on ip ${address}, port ${PORT}.\n`);
    });
});