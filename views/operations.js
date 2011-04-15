var tr = require('../webcetas.node/utils/langs').tr;
var fmt = require('../webcetas.node/utils/formats').fmt;
var db = require('../utils/db');

url_mapping = { '/' : resume, '/home' : home, '/resume' : resume,
                '/skills' : skills, '/blog' : blog };

function home( req, res )
{
    fmt("hello world", write( res ) );
}

function resume( req, res )
{
    fmt( db.resume, write( res ));
}

function skills( req, res )
{
    fmt( db.resume.Skills, write( res ));
}

function blog( req, res )
{
    res.writeHead( 302, {'Location' : 
                            'http://www.kailashnath.posterous.com'} );
}

function write( res ) 
{
    return function( data ) { res.write( data ); };
}

module.exports = url_mapping
