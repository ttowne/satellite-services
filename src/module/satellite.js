import satelliteUtils from 'module/satelliteUtils';

const MAIN_WORKER = new SharedWorker('worker/main.js', 'satellite_services');
const MAX_TIMEOUT = 300000;

function getNewPort () {
    return (new SharedWorker('worker/main.js', 'satellite_services')).port;
}

function handleResponse () {
    return;
}

function messageServices (config, params) {
    var timer,
        promise,
        mergedParams = Object.assign({}, config, params);

    mergedParams.url = satelliteUtils.getResolvedPath(config.url, mergedParams);

    promise = (new Promise(function (resolve) {
        port.onmessage = handleResponse.bind({}, {
            resolve: resolve,
            reject: reject,
            timer: setTimeout(reject, mergedParams.timeout || TIMEOUT)
        });
        //TODO - figure out how to handle responses and fail on timeout.
        port.postMessage(mergedParams);
    })).then(function (response) {
        var rejectCodes = mergedParams.rejectCodes,
            resolveCodes = mergedParams.resolveCodes;

        if (true) {
            //todo
        }
    }, function () {
        return;
    });

    return promise;
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
