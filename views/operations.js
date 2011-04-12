var tr = require('../webcetas.node/utils/langs').tr;
var db = require('../utils/db');

url_mapping = { '/' : resume, '/home' : home, '/resume' : resume };

function home( req, res )
{
    res.write( tr("hello world") );
}

function resume( req, res )
{
    res.write( tr( db.resume ));
}

function skills( req, res )
{
    res.write( tr( db.Skills ));
}

module.exports = url_mapping
