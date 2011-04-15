var eng = require('../conf');

langs = { set : setLanguage,
          get : getLanguage,
          tr  : translate }

var dest_lang  = 'en';

function setLanguage( lang )
{
   dest_lang = lang.split(',')[0].substr(0,2);
}

function getLanguage()
{
    return dest_lang;
}

function translate( str, callback )
{
    eng.translate_engine( dest_lang, str, callback ); 
}

module.exports = langs;
