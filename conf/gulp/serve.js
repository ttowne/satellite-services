var gulp = require('gulp'),
    path = require('path'),
    serverPath = '../../dev/server.js',
    spawn = require('child_process').spawn;

module.exports = function () {
    var child = spawn('node', [path.resolve(__dirname, serverPath)]);
    child.stdout.on('data', function (data) {
        process.stdout.write(data);
    });
    child.stderr.on('data', function (data) {
        process.stderr.write(data);
    })
};
