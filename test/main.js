var TEST_REGEXP = /\/?test[^\/]*\.js$/i,
    allTestFiles = [];

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
    var normalizedTestModule;
    if (TEST_REGEXP.test(file)) {
        /* Normalize paths to RequireJS module names. Modules expect to be
         * loaded from dist/src, so test files need to step back up to dist
         * so their paths resolve correctly to dist/test. */
        normalizedTestModule = file.replace(/^\/base\//g, '../')
            .replace(/\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }
});

require.config({
    baseUrl: '/base/src',
    deps: allTestFiles,
    callback: window.__karma__.start
});
