var eslint = require('gulp-eslint'),
    exec = require('child_process').exec,
    gulp = require('gulp'),
    karma = require('karma'),
    path = require('path'),
    serverPath = '../../dev/server.js',
    spawn = require('child_process').spawn;

gulp.task('serve', function () {
    var child = spawn('node', [path.resolve(__dirname, serverPath)]);
    child.stdout.on('data', function (data) {
        process.stdout.write(data);
    });
    child.stderr.on('data', function (data) {
        process.stderr.write(data);
    })
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
