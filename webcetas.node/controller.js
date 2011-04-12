var conf = require('./conf');

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

    res.writeHead( 200, {'Content-Type' : 'text/html;charset=utf-8'} );
    func( req, writer(res));

/*    if( !res.finished )
    {
        res.end();
    }
*/
}

function writer( response )
{
    var res = response;

    return function( data ) { console.log( data ); res.write( data ); res.end(); };
}

module.exports = drive

