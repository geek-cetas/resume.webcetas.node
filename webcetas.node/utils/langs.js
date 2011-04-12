var formats = require('./formats');

langs = { set : setLanguage,
          get : getLanguage,
          tr  : tr }

var default_lang  = 'en';

function setLanguage( lang )
{
   default_lang = lang.split(',')[0].substr(0,2);
}

function getLanguage()
{
    return default_lang;
}

function translate( str )
{
    if( default_lang == 'hi' )
        return 'मानक हिन्दी';
    else
        return str;
 
}

function tr( obj )
{
    var result = "";
    console.log( 'Language is ' + langs.get() );

    if( typeof obj == 'string' )
        result = formats.text( obj );

    else if( typeof obj == 'object' )
        result = formats.json( obj );

    return translate( result );
    
}

module.exports = langs;
