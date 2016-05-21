var gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    karma = require('karma'),
    merge = require('merge-stream'),
    serve = require('./serve.js');

gulp.task('build', function () {
    var src = gulp.src([
            'src/**/*.js',
        ]).pipe(babel()).pipe(gulp.dest('dist/src')),
        test = gulp.src([
            'test/**/*.js',
        ]).pipe(babel()).pipe(gulp.dest('dist/test')),
        examples = gulp.src([
            'examples/**/*.js'
        ]).pipe(babel()).pipe(gulp.dest('dist/examples'));

    return merge(src, test).add(examples);
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
