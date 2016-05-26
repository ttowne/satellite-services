var Ajax;

const defaults = {
    headers: {},
    onProgress: function () {}
};

function merge (a, b, deepCopy) {
    Object.keys(b).forEach(function (key) {
        if (deepCopy && 'object' === typeof b[key]) {
            merge(a[key], b[key]);
        } else {
            a[key] = b[key];
        }
    });
    return a;
}

function createRequest (options) {
    var request = new XMLHttpRequest();

    options = options || {};
    merge(options, defaults);

    request.open({
        method: options.method,
        url: options.url,
        async: options.async,
        user: options.user,
        password: options.password
    });

    request.timeout = options.timeout || 0;

    Object.keys(options.headers).forEach(function (key) {
        request.setRequestHeader(key, options.headers[key]);
    });

    request.addEventListener('progress', options.onProgress);

    return request;
}

function sendRequest (request, data) {
    return new Promise(function (resolve, reject) {
        request.addEventListener('load', resolve);
        request.addEventListener('error', reject);
        request.addEventListener('abort', reject);
        request.send(data);
    });
}

Ajax = {
    read: function (options) {
        var request;
        options = options || {};
        options.method = options.method || 'GET';
        request = createRequest(options);
        return sendRequest(request);
    },

    write: function (options, data) {
        var request;
        options = options || {};
        options.method = options.method || 'POST';
        options.headers = options.headers || {};
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        request = createRequest(options);
        return sendRequest(request, data);
    },

    remove: function (options) {
        var request;
        options = options || {};
        options.method = 'DELETE';
        request = createRequest(options);
        return sendRequest(request);
    }
};

export default Ajax;
