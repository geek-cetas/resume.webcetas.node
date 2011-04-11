
Formats = { json : jsonFormat }

function repeat( count )
{
    return new Array
}

function addSpaces( count )
{
    return new Array( count ).join( '  ' );
}

function jsonFormat( text )
{
    text = JSON.stringify( text );
    var response = "";
    var spaces = 0;

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
            case ':' : response += " " + val + " "; break;
            default  : response += val;
        
        }
    }   
    return response;
}

module.exports = Formats
