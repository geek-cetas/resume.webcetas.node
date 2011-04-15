var langs = require('./langs');

Formats = { json : jsonFormat,
            text : strFormat,
            fmt  : format,
            fmtr : formatAndTranslate
          }

translate = null;

function addSpaces( count )
{
    return new Array( count ).join( '  ' );
}

function formatAndTranslate( translator )
{
    translate = translator;
    return format;
}

function format( obj, callback )
{
    var response;
    if( typeof obj == 'object' )
        response = jsonFormat( obj );

    else if( typeof obj == 'string' )
        response = strFormat( obj );

    if( response != null && translate != null )
    {
        translate( response, callback );
        return;
    }
    callback( response );
}

function strFormat( text )
{
   return new Buffer( text );
}

function jsonFormat( text )
{
    
    var response = "";
    var spaces = 0;
    text = JSON.stringify( text );

    for( var index = 0; index < text.length; index++ )
    {
        var val = text[index];

        switch( val ) {
            case '{' : 
            case '[' : spaces ++; 
                       response += val +'\n' + addSpaces( spaces );  break;
            case '}' :
            case ']' : response += '\n' + addSpaces( spaces ) + val; 
                       spaces--; break;
            case ',' : response += val + '\n' + addSpaces( spaces ); break;


            default  : response += val;
        
        }
    }   
    return new Buffer( response.replace( /":/g, "\" : " ).replace( /([a-zA-Z]),\n/g, "$1," ));
}

module.exports = Formats;

