var express = require('express');
var path = require('path');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var secret = require('./pass').generate(15);

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//var userRepository = require('./UserRepository');

app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

/*
app.use(function(req, res, next) {
    res.locals.login = req..isAuthenticated();
    next();
});
//*/

app.use(function(req, res, next) {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/signin/temp', require('./routes/signin/temp'));
app.use('/signup/temp', require('./routes/signup/temp'));

module.exports = app;
