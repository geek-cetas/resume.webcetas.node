var http = require('http');
var controller = require('./webcetas.node/controller');
var conf = require('./webcetas.node/conf');
var tr = require('./webcetas.node/utils/langs').tr;
var views = require('./views/operations');

conf.views = views

http.createServer( function( req, res ) {
    console.log( req.headers['accept-language'] );
    controller( req, res );
    }).listen( conf.port );

console.log( tr( 'Server started successfully' ));

