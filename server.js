var express = require('express');
var _ = require('underscore');
var app = express();

app.get('/', function(req, res) { res.redirect('/api/whoami/'); });
app.get('/api/whoami/', function(req, res) {
//  res.end(JSON.stringify(req.headers));
  var data = _.pick(req.headers, "x-forwarded-for", "accept-language", "user-agent");
  var obj = { 
              ipaddress: data["x-forwarded-for"],
              language: data["accept-language"].split(',')[0],
              software: data["user-agent"].match(/\((.*?)\)/)[0].split('').slice(1, -1).join(''),
            };
  res.end(JSON.stringify(obj));
});
app.listen(8080);
