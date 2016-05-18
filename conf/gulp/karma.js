module.exports = function (config) {
    config.set({
        basePath: '../../dist',
        colors: true,
        reporter: ['progress'],
        browsers: ['Chrome'],
        frameworks: ['jasmine', 'commonjs'],
        files: [
            'src/**/*.js',
            'test/**/*.js',
            'examples/**/*.js'
        ],
        exclude: [
            'src/worker/**/*.js'
        ],
        preprocessors: {
            '**/*.js': ['commonjs']
        },
        commonjsPreprocessor: {
          modulesRoot: 'dist/src'
        }
    });
};