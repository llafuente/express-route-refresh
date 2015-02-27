var server = require("./app.js");

var request = require("request"),
  tap = require("tap"),
  test = tap.test;

var api_res_one;
test("get /api", function (t) {
  request('http://localhost:8080/api', function (error, response, body) {
    t.ok(!error, "no error");
    api_res_one = body;
    console.log("api - ", body);

    t.end();
  });
});

test("get /refresh", function (t) {
  request('http://localhost:8080/refresh', function (error, response, body) {
    t.ok(!error, "no error");
    console.log("refresh - ", body);

    t.end();
  });
});

test("get /api", function (t) {
  request('http://localhost:8080/api', function (error, response, body) {
    t.ok(!error, "no error");
    t.ok (body != api_res_one, "response are not the same!");
    console.log("api - ", body);

    t.end();
  });
});


test("get /api (twice) restart in the middle. Responses should be different", function (t) {
  // /api has  2000ms response delay, 0-500-1000 per request should be ok!
  var st_body,
    nd_body,
    requests = 0;

  request('http://localhost:8080/api', function (error, response, body) {
    t.ok(!error, "no error");
    st_body = body;

    requests_done();
  });

  setTimeout(function() {
    request('http://localhost:8080/refresh', function (error, response, body) {
      t.ok(!error, "no error");

      requests_done();
    });
  }, 500);

  setTimeout(function() {
    request('http://localhost:8080/api', function (error, response, body) {
      t.ok(!error, "no error");
      nd_body = body;

      requests_done();
    });
  }, 1000);

  function requests_done() {
    ++requests;
    if (requests === 3) {
      t.ok(st_body != nd_body, "different api bodies")
      t.end();
    }
  }
});


test("close server", function (t) {
  server.close();
  t.end();
});
