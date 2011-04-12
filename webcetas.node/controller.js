var conf = require('./conf');
var langs = require('./utils/langs');

function drive( req, res )
{
    console.log( req.url );
    func = conf.views[req.url];

    if( func == null )
    {
        res.writeHead( 404, {'Content-Type' : 'text/plain'} ); 
        res.end();
        return;
    }

    langs.set( req.headers['accept-language'] );

    res.writeHead( 200, {'Content-Type' : 'text/plain;charset=utf-8'} );
    func( req, res );

    if( !res.finished )
    {
        res.end();
    }
}

module.exports = drive 
