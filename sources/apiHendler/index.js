"use strict";
const DB = require('../fake-db');

module.exports = function (req, res) {
    const METHOD = req.method;
    const REQUEST_URL = req.url;

    if (METHOD === 'GET') {
        //get collection
        if (REQUEST_URL.length < 15) {
            DB.getCollection(callback);
        }//get user by id
        else {
            let userID = REQUEST_URL.slice(11);
            DB.getById(userID, callback);
        }
    }
    else if (METHOD === 'POST') {
        recieveData(req, (body)=> {
            let user = JSON.parse(body);
            DB.create(user, callback);
        });
    }
    else if (METHOD === 'PUT') {
        recieveData(req, (body)=> {
            let user = JSON.parse(body);
            DB.update(user, callback);
        });
    }
    else if (METHOD === 'DELETE') {
        let userID = REQUEST_URL.slice(11);
        DB.remove(userID, callback);
    }

    function callback(err, data) {
        if (err) {
            res.writeHead(404, {'Content-type': 'application/json'});
            res.end(err);
        }
        else {
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(JSON.stringify(data));
        }
    }
};


function recieveData(req, callback) {
    let body = [];

    req.on('error', (err) => {
            console.error(err);
        })
        .on('data', (chunk)=> {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            callback(body);
        });
}

