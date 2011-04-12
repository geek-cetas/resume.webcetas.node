var https = require('https');

var options = { host : 'www.googleapis.com',
                port : 443,
                path : '/language/translate/v2?key=AIzaSyCCinrsoboqDq-w8GKGP3HZSbpmkBh_lE4&q={0}&target={1}'}

function translate( dst, text, callback )
{
    console.log("Translating to " + dst);
    options.path = options.path.replace( '{0}', text ).replace( '{1}', dst );
    console.log( options.path );
    https.get( options, function( res ) {
        res.on( 'data', function( data ) { callback( data ); });
    }).on( 'error', function( data ) { console.log( 'error' + data ); callback( data.message ); });

}

module.exports = translate;
