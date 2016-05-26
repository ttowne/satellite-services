importScripts('/lib/require.js');
require([
    'ajax'
], function (ajax) {
    console.log('anything');
    console.log(ajax.description);
})
