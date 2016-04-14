var bodyParser = require('body-parser'),
    db,
    express = require('express'),
    mongoose = require('mongoose'),
    models = require('./models.js'),
    passwordHash = require('password-hash'),
    ready = false,
    router = express.Router(),
    todo;

mongoose.connect('mongodb://localhost/todo', function (err) {
    if (err) {
        console.error('Unable to connect to mongoDB. Is it installed and running?', `ERR ${err}`);
    }
});

mongoose.connection.once('open', function () {
    ready = true;
});

router.use(bodyParser.json());

router.get('/users', function (req, res) {
    models.User.find(function (err, users) {
        res.send(users);
    })
});

router.post('/users', function (req, res) {
    console.log(req.body);

    var user = new models.User({
        username: req.body.username,
        passwd: passwordHash.generate(req.body.password)
    });

    user.save(req.body, function (err, savedUser) {
        if (err) {
            res.status(500).send(`Unable to create user. ERROR ${err}`);
        } else {
            res.send(savedUser);
        }
    });
});

router.get('/users/:id', function (req, res) {
    models.User.findOne(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(`Unable to complete request. ERROR: ${err}`);
        } else if (!user) {
            res.status(404).send(`Unable to find user ${req.params.id}.`);
        } else {
            res.send(user);
        }
    });
});

router.delete('/users/:id', function (req, res) {
    models.User.remove(req.params.id, function (err) {
        if (err) {
            res.status(500).send(`Unable to delete user ${req.params.id}. ERROR: ${err}`);
        } else {
            res.end();
        }
    })
});

module.exports = router;
