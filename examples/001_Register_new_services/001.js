require(['../requirejs-conf.js'], function () {
    require([
        'module/satellite'
    ], function () {
        var worker = new SharedWorker('../worker/main.js');
    });
});
