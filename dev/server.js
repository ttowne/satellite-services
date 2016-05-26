var express = require('express'),
    mongoose = require('mongoose'),
    port = 3000,
    server = express(),
    todo = require('./todo/router.js');

server.get('/', function (req, res) {
    res.send('This is a development server for the satellite-services library.');
});

server.use(express.static('build/src'));
server.use(express.static('build'));
server.use(express.static('examples'));

server.use('/todo', todo);

server.listen(port, function () {
    console.log(`Todo server running on port ${port}`);
});
