var express = require('express');
var router = express.Router();

var socket = require('../socket');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('the number of online users: ' + socket.numUsers);
});

module.exports = router;
