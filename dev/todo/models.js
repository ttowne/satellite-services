var exports = module.exports,
    mongoose = require('mongoose'),
    schemas = require('./schemas.js');

exports.User = mongoose.model('User', mongoose.Schema(schemas.user));
exports.List = mongoose.model('List', mongoose.Schema(schemas.list));
exports.Task = mongoose.model('Task', mongoose.Schema(schemas.task));
