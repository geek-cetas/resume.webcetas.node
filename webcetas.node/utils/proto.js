var url = require('url');
var qs = require('querystring');

var parser = function( req ) {
    this.url = req.url
}

parser.prototype.params = function() {
    return url.parse( this.url, true ).query;
}

var newParser = function( req ) {
    return new parser( req );
}

module.exports = { parse : newParser };
