var http = require('http');
var controller = require('./controller');
var conf = require('./utils/conf');
var tr = require('./utils/format').tr;

http.createServer( function( req, res ) {

    controller( req, res );
    }).listen( conf.port );

console.log( tr( 'Server started successfully' ));

