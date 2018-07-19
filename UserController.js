var userRepository = require('./UserRepository');

var socket = require('./socket');

var User = require('./User');
var pass = require('./pass');

function signup_temp(req) {
    let user_id = pass.generate(30);

    userRepository.findByUserId(user_id, function (user) {
        if (user) {
            signup_temp(req.body.username, req.body.password, req)
        } else {
            userRepository.save(new User(user_id, pass.hashPassword(req.body.password), 'temp', req.body.username));

            req.session.authenticated = true;
            req.session.user_id = user_id;
            req.session.username = req.body.username;
            socket.io.emit('add user', req.body.username);
        }
    });
}

function signup_facebook(req) {

}

function signup_google(req) {

}

module.exports = {
    try_signin: function (req, res) {
        userRepository.findByName(req.body.username, function (user) {
            if (!user) {
                res.render('signin', { error: 'Invalid Name', title: 'sign in' });
            } else {
                if (!pass.checkPassword(user, req.body.password))  {
                    res.render('signin', { error: 'Invalid Password', title: 'sign in' });
                }
                else {
                    req.session.authenticated = true;
                    req.session.user_id = user.user_id;
                    req.session.username = user.name;
                    socket.io.emit('add user', user.name);
                }
            }
        });
    },

    try_signup_temp: function (req, res) {
        userRepository.findByName(req.body.username, function (user) {
            if (user) {
                res.render('signup', { error: 'Name is already taken', title: 'sign in' });
            } else {
                if (!pass.isValid(req.body.password))  {
                    res.render('signup', { error: 'Invalid Password', title: 'sign in' });
                }
                else {
                    signup_temp(req);
                }
            }
        });
    }

};