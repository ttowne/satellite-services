var gulp = require('gulp'),
    babel = require('gulp-babel'),
    del = require('del'),
    eslint = require('gulp-eslint'),
    flatten = require('gulp-flatten'),
    karma = require('karma'),
    merge = require('merge-stream'),
    serve = require('./serve.js');

gulp.task('build', ['clean'], function () {
    var src, lib, test, testMain;

    src = gulp.src([
        'src/**/*.js',
    ]).pipe(babel({
        ignore: 'src/worker/main.js'
    })).pipe(gulp.dest('build/src')),

    test = gulp.src([
        'test/**/*.js'
    ]).pipe(babel({
        ignore: 'test/main.js'
    })).pipe(gulp.dest('build/test')),

    lib = gulp.src([
        'node_modules/requirejs/require.js',
        'node_modules/karma-requirejs/lib/adapter.js',
    ]).pipe(gulp.dest('build/lib'));

    return merge(src, test, lib);
});

gulp.task('clean', function () {
    return del(['build/**/*', 'dist/**/*']);
});

gulp.task('eslint', function () {
    return gulp.src([
        'src/**/*.js',
        'test/**/*.js',
        'examples/**/*.js'
    ]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError());
});

gulp.task('serve', serve);

//TODO - These two tasks should be moved to testing.js
gulp.task('test', ['build'], function (done) {
    return new karma.Server({
        configFile: __dirname + '/karma.js',
        singleRun: true
    }, done).start();
});
//TODO - Need to figure out how to run auto build on changes for this task.
gulp.task('debug', ['build'], function (done) {
    return new karma.Server({
        configFile: __dirname + '/karma.js',
        autoWatch: true
    }, done).start();
});
