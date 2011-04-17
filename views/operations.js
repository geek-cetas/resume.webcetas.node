var fmt = require('../utils/formats').fmt;
var view = require('../webcetas.node/views').view;
var db = require('../utils/db');
var fs = require('fs');

view('/home/([a-z]+).html',
function home( req, res, page )
{
    var out = res;
    var $ = this;
    fs.readFile( './views/html/' + page +'.html', function( err, data )
    {
        if( err ) throw err;
        out.write( data );
        out.end();
    });
});

view('^(/|/resume)[/]?$',
function resume( req, res, args )
{
    res.writeHead( 200, {'Content-type' : 'text/plain;charset=utf-8'} );
    fmt( db.resume, write( res ));
    res.end();
});

view('/resume/([a-zA-Z]+)[/]?$',
function sub( req, res, args )
{
    var key = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    console.log( key );
    res.writeHead( 200, {'Content-type' : 'text/plain;charset=utf-8'} );
    fmt( db.resume[key], write( res ));
    res.end();
});

view('/vtest/([0-9]+)/([0-9]+)/$',
    function vtest( req, res, args )
    {
        res.end( "kailash test success !!" + args );
    });

function write( res ) 
{
    return function( data ) { res.write( data ); };
}

