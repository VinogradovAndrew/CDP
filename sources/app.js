"use strict";
const http = require('http');
const fs = require('fs');
const path = require("path");
const DB = require('./fake-db');


let server = http.createServer((req, res)=> {
    const REQUEST_URL = req.url;
    const METHOD = req.method;
    const DIR_NAME = path.dirname(REQUEST_URL).substring(1);
    const FYLE_NAME = path.basename(REQUEST_URL);
    const FYLE_TYPE = path.extname(REQUEST_URL);


    if (REQUEST_URL === '/' && METHOD === 'GET') {

        fs.readFile('views/index.html', (err, data)=> {

            res.writeHead(200, {'Content-type': 'text/html'});
            res.end(data);

        });
    }
    else if (FYLE_TYPE === '.css') {

        fs.readFile('public/css/' + FYLE_NAME, 'utf8', (err, data)=> {

            res.writeHead(200, {'Content-type': 'text/css', 'charset': 'utf8'});
            res.end(data);

        });
    }
    else if (FYLE_TYPE === '.js') {

        fs.readFile(DIR_NAME + '/' + FYLE_NAME, 'utf8', (err, data)=> {

            res.writeHead(200, {'Content-type': 'text/javascript', 'charset': 'utf8'});
            res.end(data);
        });
    }
    else if (FYLE_TYPE === '.tpl') {

        fs.readFile(DIR_NAME + '/' + FYLE_NAME, 'utf8', (err, data)=> {

            res.writeHead(200, {'Content-type': 'text/plain', 'charset': 'utf8'});
            res.end(data);
        });
    }
    else if (FYLE_TYPE === '.ico') {
        res.writeHead(404);
        res.end();
    }

    else if ( METHOD === 'GET') {
        //Get Users collection
        if (REQUEST_URL === '/api/users'){
            DB.getCollection(function (err, collection) {
                if (err) {
                    console.log(err);
                    res.writeHead(500);
                    res.end();
                    return;
                }

                res.writeHead(200, {
                    'Content-type': 'application/json'
                });
                res.end(JSON.stringify(collection));
            })
        }
        //get user
        else {
            let personID = REQUEST_URL.slice(11);

            getUserFromDB(req,res,personID);

        }

    }
    //create user
    else if (REQUEST_URL === '/api/users' && METHOD === 'POST') {
        recieveData(req, res, saveUserToDB);
    }
    //UPDATE USER
    else if (METHOD === 'PUT') {
        recieveData(req, res,  updateUser);
    }
    //delete user
    else if ( METHOD === 'DELETE') {
        let personID = REQUEST_URL.slice(11);

        deleteUser(req,res,personID);
    }
});


server.listen(3000, function () {
    console.log('Listening on port http://localhost:3000')
});

function recieveData(req, res, callback) {
    let body = [];

    req.on('error', (err) => {
            console.error(err);
        })
        .on('data', (chunk)=> {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            console.log(body);
            callback(req, res, body);
        });
}
function saveUserToDB(req, res, data) {

    data = JSON.parse(data);

    DB.create(data, function () {
        res.writeHead(200, {
            "Content-type": "application/json"
        });
        res.end(JSON.stringify(data));
    });
}
function getUserFromDB(req,res,id){

    DB.getById(id,function(err,user){

        res.writeHead(200, {
            "Content-type": "application/json"
        });

        res.end(JSON.stringify(user));
    })
}
function updateUser(req,res,data){

    data = JSON.parse(data);

    DB.update(data,function(err,user){

        res.writeHead(200, {
            "Content-type": "application/json"
        });

        res.end(JSON.stringify(user));
    })
}
function deleteUser(req,res,id){

    DB.remove(id,function(err,user){
        if(err){
            res.writeHead(200, {
                "Content-type": "application/json"
            });
            res.end();
        }
        else {
            res.writeHead(500);
            res.end()
        }
    });
}