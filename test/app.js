var express = require('express');

// Setup server
var app = express();

var server = require('http').createServer(app);

require("./routes.js")(app);

// Start server
module.exports = server.listen(8080, '0.0.0.0', function () {
  console.log('Express server listening on %d, in %s mode', 8080, app.get('env'));
});
