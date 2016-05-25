const paramsRegExp = /\$\{[\w\-]+\}/gi;
const cleanRegExp = /[\$\{\}]/gi;
var satelliteUtils;

satelliteUtils = {

    createResolvedChain: function (paths, obj = {}) {
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
                return Promise.resolve();
            };
        }

        return paths.length ? satelliteUtils.createResolvedChain(paths, next) : next;
    },

    getResolveServicePath: function (path = '', params = {}) {
        return (paramsRegExp.match(path) || []).reduce(function (str = '', arg = '') {
            var value = params[arg.replace(cleanRegExp, '')];

            if (!value) {
                throw `The service path ${path} did not contain a "${arg}" param.`;
            }

            return str.replace(arg, value);
        });
    },

};

export default satelliteUtils;
