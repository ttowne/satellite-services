var exports = module.exports,
    mongoose = require('mongoose');

exports.user = {
    username: {
        type: String,
        required: true
    },
    passwd: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
};

exports.task = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: String,
    created: {
        type: Date,
        default: Date.now
    },
    done: Boolean
};

exports.list = {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: String,
    created: {
        type: Date,
        default: Date.now
    },
    tasks: [exports.task]
};
