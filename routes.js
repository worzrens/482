var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('./dbSchema');
var scripts = require('./scripts')

router.get('/users/', (req, res) => {
    User.find({}, function(err, users) {
        var userArr = [];

        users.forEach(function(user) {
            userArr.push(user.name);
        });
        scripts.generateRes(res, userArr)
    });
});


router.post('/users/', bodyParser.json(), bodyParser.urlencoded({ extended: true }), (req, res) => {
    var user_data = scripts.returnUserObj(req.body);

    if (scripts.validateCredentials(user_data, res)) return;

    var user = new User(user_data);
    user.save(function (err) {
        if (err) {scripts.generateRes(res, {'error':err.errors.name.message}, 400); return}
        var response = {
            "result": "User created",
            "info": scripts.returnUserObj(user)
        }
        scripts.generateRes(res, response, 201)
    })
});



router.get('/users/:userID', (req, res) => {
    User.findOne(scripts.filterByName(req), function(err, user) {
        if (err || !user)  {
            scripts.generateRes(res, {"error": err || "User not found"}, 400);
        }
        else {
            scripts.generateRes(res, scripts.returnUserObj(user))
        }
    });
});


router.delete('/users/:userID', (req, res) => {
    User.findOneAndRemove(scripts.filterByName(req), function(err, user) {
        if (err || !user)  {
            scripts.generateRes(res, {"error": err || "User not found"}, 400);
        }
        else {
            scripts.generateRes(res, {"message": "Deleted Successfully"})
        }
    });
});


router.put('/users/:userID',  bodyParser.json(), bodyParser.urlencoded({ extended: true }), (req, res) => {
    User.findOne(scripts.filterByName(req), function(err, user) {
        if (err || !user) {
            scripts.generateRes(res, {"error": err || "User not found"}, 400);
        } else {
            var updatedInfo = {
                password: req.body.password,
                description: req.body.description
            }

            if (scripts.validateCredentials(updatedInfo, res)) return;

            User.findOneAndUpdate(scripts.filterByName(req), updatedInfo, {new: true}, function (err, user) {
                scripts.generateRes(res, scripts.returnUserObj(user))
            })
        }
    });
});

module.exports = router


