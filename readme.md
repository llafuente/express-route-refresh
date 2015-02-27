# express-route-refresh [![Build Status](https://secure.travis-ci.org/llafuente/express-route-refresh.png?branch=master)](http://travis-ci.org/llafuente/express-route-refresh)

![NPM](https://nodei.co/npm/express-route-refresh.png?compact=true)


## Introduction

express-route-refresh reload routes in your express app without restarting the process, just
following a simple pattern.

You can restart a URL composed by a Router, that is exported by a unique file. Let's see an example.


#### api.js

```js
'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function API(req, res, next) {
  setTimeout(function() {
    res.send('ok\n');
  }, 10000);
});


module.exports = router;
```

#### routes.js


```js
var refreshable = require("express-route-refresh");

module.exports = function(app) {

  var refresh_middleware = [
    refreshable(app, '/api', './api.js')
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

```

#### app.js

```js

var express = require('express');

// Setup server
var app = express();

var server = require('http').createServer(app);

require("routes.js")(app);

// Start server
server.listen(8080, '0.0.0.0', function () {
  console.log('Express server listening on %d, in %s mode', 8080, app.get('env'));
});

```


## Limitations

One file (export router) - One route.

If your jsfile do anything fancy that is not related to export a Router. It could not work...

Keep it simple, just export a router and everything will be fine :)

## TODO & PR welcome

* test if support multiple routes usage. atm we only test at app (root) level.
* previous versions?
* how to test multiple express versions? maybe duplicating in the package.json...


## Notice about express versions

It's tested with express 4.0.

express do not expose any API to allow middlewares manipulation.

I did it modifying internal variables in express application in particular: `_router.stack`,
I will be happy to support any new version in the way or past if needed/requested.

Supported versions:
```js
var refresh_latest = require("express-route-refresh"), // actually are the same
  refresh_v400 = require("express-route-refresh").v400;
```



# License

MIT
