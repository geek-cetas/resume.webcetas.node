var views = require('./views');

function drive( req, res )
{
    var ctlr = views.match( req.url ).on( 'match',
         function( view, args ) {
            res.writeHead( 200,
                           {'Content-Type' : 'text/html;charset=utf-8'} );
            try {
                new view( req, res, args );
            }
            catch( e ) { console.log( "ERROR : " + e.stack );
                       res.writeHead( 400, {'Content-Type': 'text/html'} );
                       res.end(); }

        }).on( 'fail', function( message ) {
                         res.writeHead( 404 );
                         console.log( message );
                         res.end();
                         });

    ctlr.run();
        
}

module.exports = drive

