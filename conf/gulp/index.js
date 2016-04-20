var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    karma = require('karma'),
    serve = require('./serve.js');

gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('eslint', function () {
    return gulp.src([
        'src/**/*.js',
        'test/**/*.js',
        'examples/**/*.js'
    ]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
});

gulp.task('serve', serve);

gulp.task('test', function (done) {
    return new karma.Server({
        configFile: __dirname + '/karma.js'
    }, done).start();
});
