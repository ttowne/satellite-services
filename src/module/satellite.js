import satelliteUtils from 'module/satelliteUtils';

/**
 * This method creates the service method for the new service.
 * @return {Promise} - Promise from the service
 */
function createServiceMethod () {
    return Promise.resolve();
}

/**
 * This method allows the user to register service methods onto
 *     the satellite service object.
 * @param {Object} config - The new service configuration.
 * @return {module/satellite} - The satellite object
 */
function satellite (config) {
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

    obj[key] = createServiceMethod(config.path);

    return satellite;
}

export default satellite;
