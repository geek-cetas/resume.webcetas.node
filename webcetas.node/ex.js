var ev = require('events').EventEmitter;

var exception = function( ctx, ex, callback ) {
    if( !ex )
    {
        if( callback ) {callback();}
        return false;
    }
    console.log( ex.stack );
    ctx.emit( 'error', ex, message( ex ) );
    return true;
};

var message = function( ex ) {
    var msg = {code : 500,
               type : 'error',
               description : ex.message};
    return msg;
}

module.exports = {ex : exception}; 
