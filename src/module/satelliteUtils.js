var satelliteUtils;

satelliteUtils = {

    createResolvedChain: function (paths, obj) {
        var key = paths.shift(),
            next = (obj || {})[key];

        if (!obj) {
            return null;
        }

        if (!key) {
            return obj;
        }

        if (!next) {
            next = obj[key] = function () {
                return Promise.resolve();
            };
        }

        return paths.length ? satelliteUtils.createResolvedChain(paths, next) : next;
    }

};

export default satelliteUtils;
