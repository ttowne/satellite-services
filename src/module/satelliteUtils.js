var satelliteUtils;

satelliteUtils = {

    createResolvedChain: function (paths, obj) {
        var key = paths.shift(),
            next = obj[key];

        if (!obj) {
            return null;
        }

        if (!key) {
            return obj;
        }

        if (!next) {
            next = obj[key] = function () {
                var promise = new Promise();

                promise.resolve();

                return promise;
            };
        }

        return paths.length ? satelliteUtils.createResolvedChain(next, paths) : next;
    }

};

export default satelliteUtils;
