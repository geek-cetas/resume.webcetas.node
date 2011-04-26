Config = { port : 8090,
           views : {},
           translate_engine : function( dst, text, callback ) { console.log('still here'); return callback( text ); } }

module.exports = Config
