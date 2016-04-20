import satelliteUtils from 'satelliteUtils';

function createServiceMethod () {
    var promise = new Promise();

    promise.resolve();

    return promise;
}

function satellite (config) {
    var obj,
        name = config.name || '',
        chain = name.split('.'),
        key = chain.shift();

    if (!key) {
        return satellite;
    }

    obj = chain.length ? satelliteUtils.createResolvedChain(chain, satellite) : satellite;
    obj[key] = createServiceMethod(config.path);

    return satellite;
}

export default satellite;
