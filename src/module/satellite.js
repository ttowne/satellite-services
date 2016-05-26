import satelliteUtils from 'module/satelliteUtils';

const worker = new SharedWorker('worker/main.js');
const port = worker.port;
const TIMEOUT = 300000;

port.start();
addEventListener('unload', port.close.bind(port));

function messageServices (config, params) {
    var timer,
        promise,
        mergedParams = Object.assign({}, config, params);

    mergedParams.path = satelliteUtils.getResolveServicePath(config.path, mergedParams);

    promise = (new Promise(function (resolve) {
        port.addEventListener('message', resolve);
        port.postMessage(mergedParams);
        timer = setTimeout(reject, mergedParams.timeout || TIMEOUT);
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
