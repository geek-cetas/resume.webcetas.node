var conf = require('./conf');

function drive( req, res )
{
    console.log( req.url );
    var view_key = req.url;

    if( req.url[req.url.length - 1] == '/' )
    {
        view_key = new Buffer( req.url.length - 1 );
        var url = new Buffer( req.url );
        url.copy( view_key, 0, 0, req.url.length -1 );
    }

    func = conf.views[view_key.toString()];

    if( func == null )
    {
        res.writeHead( 404, {'Content-Type' : 'text/plain'} ); 
        res.end();
        return;
    }

    langs.set( req.headers['accept-language'] );

    res.writeHead( 200, {'Content-Type' : 'text/plain;charset=utf-8'} );
    func( req, res);

    if( !res.finished )
    {
        res.end();
    }

}

function writer( response )
{
    var res = response;

    return function( data ) { res.write( data ); res.end(); };
}

module.exports = drive

