var ev = require('events').EventEmitter;

var exception = function( parent, ex, callback ) {
    if( !ex )
    {
        if( callback ) {callback();}
        return false;
    }
    console.log( ex.stack );
    parent.emit( 'error', ex, message( ex ) );
    return true;
};

var message = function( ex ) {
    var msg = {code : 500,
               type : 'error',
               description : ex.message};
    return msg;
}

module.exports = {ex : exception}; 
