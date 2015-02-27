'use strict';

var express = require('express');
var router = express.Router();
var local_var = new Date();

router.get('/', function API(req, res, next) {
  setTimeout(function() {
    res.send('date ' + local_var.toString() +'\n');
  }, 2000);
});


module.exports = router;
