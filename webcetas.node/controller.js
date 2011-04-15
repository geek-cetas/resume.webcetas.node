var conf = require('./conf');
var views = require('./views');

function drive( req, res )
{

    var vw = views.match( req.url).on( 'match',
         function( view, args ) {
            res.writeHead( 200,
                           {'Content-Type' : 'text/html;charset=utf-8'} );
            try {
                new view( req, res, args );
            }
            catch(e) { console.log("ERROR : " + e);
                       res.writeHead(500, {'Content-Type': 'text/html'}); }

        }).on( 'fail', function( err ) {
                         res.writeHead( 404 );
                         console.log( err ); res.end();
                         });
    vw.run();
        
}

module.exports = drive

