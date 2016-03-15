#!/usr/bin/env node

var path = require('path');
var express = require('express');
var app = express();

var dir = path.resolve(process.argv[2] ? process.argv[2] : '.');
var port = process.argv[3] ? +process.argv[3] : 3000;

app.use('/', express.static(dir));

var server = app.listen(port, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Servring in %s at http://%s:%s', dir, host, port);
});
