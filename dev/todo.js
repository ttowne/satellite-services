var exports = module.exports,
    todo;

todo = function (req, res, next) {
    console.log('TODO');
    next();
}
exports.middleware = todo;
