var gulp = require('gulp'),
    path = require('path'),
    karma = require('karma'),
    eslint = require('gulp-eslint'),
    exec = require('child_process').exec,
    serverPath = path.resolve(__dirname, '../../dev/server.js');

gulp.task('serve', function () {
    var child = exec('node ' + serverPath);
    child.stdout.on('data', function (data) {
        console.log(data);
    });
});

gulp.task('eslint', function () {
    return gulp.src([
        'src/**/*.js',
        'examples/**/*.js'
    ]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
    return new karma.Server({
        configFile: __dirname + '/karma.js'
    }, done).start();
});