var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    path = require('path'),
    serverPath = path.resolve(__dirname, '../../dev/server.js'),
    exec = require('child_process').exec;

gulp.task('serve', function () {
    var child = exec(`node ${serverPath}`);
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
