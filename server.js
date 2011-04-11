var http = require('http');
var config = require('./config');
var formats = require('./format');

function tr( text ) {
    var val = formats.json( text );
    return val; 
}


http.createServer( function( req, res ) {
    res.writeHead( 200, {'Content-Type' : 'application/json'} );

    res.end( tr( config.author ));
    }).listen( 8070 );
console.log( 'Server started successfully' ); 

