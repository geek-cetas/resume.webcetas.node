var tr = require('../webcetas.node/utils/langs').tr;
var fmt = require('../webcetas.node/utils/formats').fmtr(tr);
var db = require('../utils/db');

url_mapping = { '/' : resume, '/home' : home, '/resume' : resume };

function home( reader, writer )
{
    fmt( "hello world", writer );
}

function resume( reader, writer )
{
    fmt( db.resume, writer );
}

function skills( reader, writer )
{
   fmt( db.Skills, writer );
}

module.exports = url_mapping
