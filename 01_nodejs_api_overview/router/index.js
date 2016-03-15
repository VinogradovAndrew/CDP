"use strict";
const fs = require('fs');
const path = require('path');

module.exports = (req, res, url) => {

    const PARSED_URL = path.parse(url);
    const FILE_TYPE = PARSED_URL.ext.slice(1);

    if (PARSED_URL.base === '') {
        sendFile(res, './views/index.html');
    }
    else {
        const FILE_LOCATION = '.' + PARSED_URL.dir + '/' + PARSED_URL.base;
        sendFile(res, FILE_LOCATION, FILE_TYPE);
    }
};

function sendFile(res, filePath, fileType) {
    fileType = fileType || 'html';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404);
            console.log(err);
            res.end();
            return console.log(err);
        }
        res.writeHead(200, {'Content-type': 'text/' + fileType});
        res.end(data);
    });
}