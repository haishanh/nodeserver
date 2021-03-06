#!/usr/bin/env node

var path = require('path');
var express = require('express');
var serveIndex = require('serve-index');
var prog = require('commander');
var app = express();

var pkg = require('../package.json');

var serveOpt = {
  icons: true,
  view: 'details'
};

prog
  .version(pkg.version)
  .option('-d, --directory <dir>', 'Directory to serve, default to pwd')
  .option('-l, --listen <host/ip>', 'IP to listen to, default to localhost')
  .option('-p, --port <num>', 'Port, default to 3000')
  .parse(process.argv);


var dir = path.resolve(prog.directory ? prog.directory : '.');
var listen = prog.listen ? prog.listen : 'localhost';
var port = prog.port ? +prog.port : 3000;

app.use('/', express.static(dir));
app.use('/', serveIndex(dir, serveOpt));

var server = app.listen(port, listen, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Servring in %s at http://%s:%s', dir, host, port);
});
