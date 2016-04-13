module.exports = function (config) {
    config.set({
        reporter: ['progress'],
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            '../../test/**/*.js',
            '../../examples/**/*.js'
        ]
    });
};