var views = require('./views');
var db = require('./utils/db');

var url_mapping = { '/home' : views.home,
                    '/resume' : views.resume,
                    '/' : views.home }

function drive( req, res )
{
    console.log( req.url );
    var func = url_mapping[req.url];
    if( func == null )
    {
        res.writeHead( 404, {'Content-Type' : 'application/json'} ); 
        res.end();
        return;
    }

    res.writeHead( 200, {'Content-Type' : 'application/json'} );
    func( req, res );

    if( !res.finished )
    {
        res.end();
    }
}

module.exports = drive 
