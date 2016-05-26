var Ajax;

const defaults = {
    headers: {},
    onProgress () {},
    timeout: 0
};

/**
 * Copy all own properties from the source object to the target object,
 * performing a deep copy as requested. This mutates the first object passed in.
 * @param {Object} target The object to be modified
 * @param {Object} source The object to copy properties from
 * @param {Boolean} [deepCopy] Whether to perform a deep copy
 * @returns {Object} The target option passed in
 */
function merge (target, source, deepCopy) {
    Object.keys(source).forEach((key) => {
        if (deepCopy && 'object' === typeof source[key]) {
            merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    });
    return target;
}

/**
 * Create and open an XMLHttpRequest based on the options given.
 * @param {Object} options Applied when opening and initializing the request
 * @returns {XMLHttpRequest} The created request
 */
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

    request.timeout = options.timeout || defaults.timeout;

    Object.keys(options.headers).forEach((key) => {
        request.setRequestHeader(key, options.headers[key]);
    });

    request.addEventListener('progress', options.onProgress);

    return request;
}

/**
 * Send a previously defined XMLHttpRequest and return a promise.
 * @param {XMLHttpRequest} request A previously defined XMLHttpRequest
 * @param {Object} [data] String data to send with the request
 * @returns {Promise} Promise is resolved or rejected as the request finishes
 */
function sendRequest (request, data) {
    return new Promise((resolve, reject) => {
        request.addEventListener('load', resolve);
        request.addEventListener('error', reject);
        request.addEventListener('abort', reject);
        request.send(data);
    });
}

Ajax = {
    read (options) {
        var request;

        options = options || {};
        options.method = options.method || 'GET';

        request = createRequest(options);

        return sendRequest(request);
    },

    write (options, data) {
        var request;

        options = merge({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }, options || {}, true);

        if ('string' !== typeof data) {
            data = JSON.stringify(data);
        }

        request = createRequest(options);

        return sendRequest(request, data);
    },

    remove (options) {
        var request;

        options = options || {};
        options.method = 'DELETE';
        request = createRequest(options);

        return sendRequest(request);
    }
};

export default Ajax;
