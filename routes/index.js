var express = require('express');
var router = express.Router();



/* GET home page. */
router
    .get('/',
        function(req, res, next) {
            if (req.session.authenticated) {
                return next();
            }

            //req.session.authenticated = true;

            res.render('index', { title: 'test02', session: req.session  });
        },
        function(req, res, next) {
            res.render('index', { title: 'hello', session: req.session });
        }
    )
    .get('/logout',
        function(req, res, next) {
            req.session.authenticated = false;
            req.session.reset();
            res.clearCookie('user_sid');
            res.redirect('/');
        }
    );


module.exports = router;
