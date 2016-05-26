module.exports = function (config) {
    config.set({
        basePath: '../../build',
        colors: true,
        reporter: ['progress'],
        browsers: ['Chrome'],
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'src/**/*.js', included: false},
            {pattern: 'test/**/*.js', included: false},
            'test/main.js'
        ]
    });
};
