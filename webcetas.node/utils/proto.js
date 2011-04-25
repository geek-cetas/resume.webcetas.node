var url = require('url');
var q = require('querystring');

function parse(http_req, greedy) {
    this.greedy = greedy != null ? greedy : false;
    this.http_req = http_req;

    if (greedy)
    {
        this.url_details = url.parse(http_req.url);
        this.qparams = q.parse(url_details.query);
    }
    else
        this.url_details = this.qparams = null;
}

parse.prototype.proto = function() {
    if (this.greedy)
        return this.url_details;

    this.url_details = url.parse(this.http_req.url);
    return this.url_details;
}

parse.prototype.params = function() {
    if (this.greedy)
        return this.qparams;
    this.qparams = q.parse(this.proto().query);
    return this.qparams;
}

function onNew(req, greedy) {
    return new parse(req, greedy);
}

module.exports = {parse : onNew};
