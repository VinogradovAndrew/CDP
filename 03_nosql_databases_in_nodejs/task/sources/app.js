"use strict";

const express = require('express');
const app = express();
const path = require('path');
const router = require('./router');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index', { title: 'EXPRESS'});
});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', router);


app.use((err, req, res, next) => {
    res.send(500, err.toString() || 'Server Error');
});
app.listen(3000,() => {
    console.log('listening on port http://localhost:3000!');
});

