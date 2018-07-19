var express = require('express');
var router = express.Router();

var socket = require('../../socket');

var User = require('../../User');
var pass = require('../../pass');


var userRepository = require('../../UserRepository');

router
    .get('/',
        function(req, res, next) {
            res.render('signup', { title: 'sign up', gpass: pass.generate(8) } );
        }
    )
    .post('/',
        function(req, res, next) {
            let user_id = pass.generate(8);
            let password = req.body.password;
            let username = req.body.username;
            let user = new User(user_id, pass.hashPassword(password), 'temp', username);
        }
    );

module.exports = router;