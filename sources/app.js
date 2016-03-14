"use strict";
const http = require('http');
const router = require('./router');
const apiHendler = require('./apiHendler');

let server = http.createServer((req, res)=> {
    const REQUEST_URL = req.url;

    if (REQUEST_URL === '/' || REQUEST_URL.match(/^\/public\//i)) {

        router(req, res, REQUEST_URL);

    }
    else if (REQUEST_URL === '/favicon.ico') {

        res.writeHead(404);
        res.end();

    }
    else {

        apiHendler(req, res);

    }
});


server.listen(3000, () => {
    console.log('Listening on port http://localhost:3000')
});
