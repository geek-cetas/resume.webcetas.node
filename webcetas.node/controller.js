var conf = require('./conf');
var views = require('./views');

function drive( req, res )
{
    res.writeHead( 200, {'Content-Type' : 'text/html;charset=utf-8'} );

    var vw = views.match(req.url).on('match',
         function(view, args) {
            try {
                new view(req, res, args);
            }
            catch(e) { console.log("ERROR : " + e);
                       res.writeHead(500, {'Content-Type': 'text/html'}); }

        }).on('fail', function(err) {
                         res.writeHead( 404 );
                         console.log(err); res.end();
                         });

    vw.run();
        
}

function writer( response )
{
    var res = response;

    return function( data ) { res.write( data ); res.end(); };
}

module.exports = drive

