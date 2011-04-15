var http = require('http');
var controller = require('./webcetas.node/controller');
var conf = require('./webcetas.node/conf');
var tr = require('./webcetas.node/utils/langs').tr;
var views = require('./views/operations');
var google_translator = require('./libs/googletranslator');

conf.views = views
conf.translate_engine = google_translator;

http.createServer( function( req, res ) {
    controller( req, res );
    }).listen( conf.port );

tr( 'Server started successfully', console.log );

