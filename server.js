
var http = require('http');
http.createServer( function( req, res ) {
    res.writeHead( 200, {'Content-Type' : 'text/plain'} );
    res.end( 'Hello world \n' );
    }).listen( 8124 );
console.log( 'Server started successfully' ); 
