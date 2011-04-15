var https = require('https');
var qfmt  = require('querystring');

var options = { host : 'www.googleapis.com',
                method : 'GET',
                path  : null,
                path_ : '/language/translate/v2?',
              }

var query  = { key : 'AIzaSyCCinrsoboqDq-w8GKGP3HZSbpmkBh_lE4',
               target : null,
               q : null}

function translate( dst, text, callback )
{
    callback( text ); return;
    query.target = dst; query.q = text.toString();
    options.path = options.path_ + qfmt.stringify( query, '&', '=' );
    console.log( options.path );

    https.get( options, function( res ) {
        res.on( 'data', function( data ) { console.log('success' ); callback( data ); });
    }).on( 'error', function( data ) { console.log( 'error' + data ); callback( data.message ); });

}

module.exports = translate;
