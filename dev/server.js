var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    mongoose = require('mongoose'),
    port = 3000,
    server = express(),
    todo = require('./todo/router.js');

server.get('/', function (req, res) {
    res.send('This is a development server for the satellite-services library.');
});

server.use(express.static('src'));
server.use(express.static('examples'));

server.use('/todo', todo);

http.createServer(server).listen(port);
https.createServer({
    key: fs.readFileSync(__dirname + '/sslcert/server.key', 'utf8'),
    cert: fs.readFileSync(__dirname + '/sslcert/server.crt', 'utf8')
}, server).listen(port + 1);
