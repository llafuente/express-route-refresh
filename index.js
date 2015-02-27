var reload = require('require-reload')(require)

function express_route_refresh(app, url, module) {
  var router_count = !app._router ? 2 : app._router.stack.length;

  app.use(url, reload(module));

  var idx = app._router.stack.length - 1;

  if (router_count != idx) {
    console.error("(warning) cannot include more than one router at a time, it may fail...", url, module);
  }

  return function refresh(req, res, next) {
    app._router.stack[idx].handle = reload(module);
    console.log('refreshed: ', url, ' @', module, '\n');

    // allow multiple calls without touching res
    if (res && res.json) {
      res.json(200);
    }
  };
}

express_route_refresh.v400 = express_route_refresh;
express_route_refresh.v410 = express_route_refresh;


module.exports = express_route_refresh;
