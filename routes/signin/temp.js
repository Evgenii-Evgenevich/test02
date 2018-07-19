var express = require('express');
var router = express.Router();

var userController = require('../../UserController');

router
    .get('/',
        function(req, res, next) {
            res.render('signin', { title: 'sign in' });
        }
    )
    .post('/',
        function(req, res, next) {
            userController.try_signin(req.body.username, req.body.password, function (err, user) {
                if (err) {
                    let m = err;
                    m.title = 'sign in';
                    res.render('signin', m);
                } else if (user) {
                    userController.signin(user, req);
                    res.redirect('/');
                }
            });
        }
    );

module.exports = router;