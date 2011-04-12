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

    res.writeHead( 200, {'Content-Type' : 'text/plain'} );
    func( req, res );

    if( !res.finished )
    {
        res.end();
    }
}

module.exports = drive 
