import satelliteUtils from 'module/satelliteUtils';

const MAIN_WORKER = new SharedWorker('worker/main.js', 'satellite_services');
const MAX_TIMEOUT = 300000;

function getNewPort () {
    return (new SharedWorker('worker/main.js', 'satellite_services')).port;
}

function handleResponse (options, msg) {
    var response = msg.data,
        params = options.params,
        status = response.status;

    if (isSuccessful(status, params.resolveCodes)) {
        options.resolve(response);
    } else if (isFailure(status, params.rejectCodes)) {
        options.reject(response);
    }
}

function isFailure(status, codes = []) {
    if (codes.length) {
        return codes.map(function (code) {
            return parseInt(code, 10);
        }).indexOf(status) !== -1;
    }

    return status < 200 || status > 399;
}

function isSuccessful(status, codes = []) {
    if (codes.length) {
        return codes.map(function (code) {
            return parseInt(code, 10);
        }).indexOf(status) !== -1;
    }

    return status > 199 && status < 400;
}

function rejected (response) {
    return `${response.status} - ${response.statusText}`;
}

function resolved (response) {
    return JSON.parse(response.responseText || '0') || response;
}

function sendRequest (params, resolve, reject) {
    var port = getNewPort();

    port.onmessage = handleResponse.bind({}, {
        params: params,
        reject: reject,
        resolve: resolve,
        timer: setTimeout(reject, TIMEOUT)
    });

    port.postMessage(params);
}

function messageServices (config, params) {
    var request,
        mergedParams = Object.assign({}, config, params);

    mergedParams.url = satelliteUtils.getResolvedPath(config.url, mergedParams);
    request = sendRequest.bind({}, mergedParams);

    return(new Promise(request)).then(resolved, rejected);
}

/**
 * This method allows the user to register service methods onto
 *     the satellite service object.
 * @param {Object} config - The new service configuration.
 * @return {module/satellite} - The satellite object
 */
function satellite (config = {}) {
    var obj,
        name = config.name || '',
        chain = name.split('.'),
        key = chain.shift();

    if (!key) {
        return satellite;
    }

    if (chain.length) {
        obj = satelliteUtils.createResolvedChain(chain, satellite);
    } else {
        obj = satellite;
    }

    obj[key] = messageServices.bind({}, config);

    return satellite;
}

export default satellite;
