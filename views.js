var db = require('./utils/db');
var tr = require('./utils/format').tr;
var ops = require('./views/operations');

views = { home : ops.home,
          resume : ops.resume }

module.exports = views;
