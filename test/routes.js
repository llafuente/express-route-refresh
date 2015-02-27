//var refreshable = require("express-route-refresh");
var refreshable = require("../index.js");
var path = require("path");

module.exports = function(app) {

  var refresh_middleware = [
    // join path, because the actual require will ocur elsewhere
    refreshable(app, '/api', path.join(__dirname, './api.js'))
  ];
  // now /api is registered

  // you can refresh just one
  app.use('/refresh', function(req, res, next) {
    // notice: require is synchronous... so this will be!!
    refresh_middleware.forEach(function(v) {
      v(); // do not send params if you are going to refresh more than one
    });
    res.send('ok');
  });
}
