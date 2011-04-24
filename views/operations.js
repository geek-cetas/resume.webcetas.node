var fmt = require('../utils/formats').fmt;
var view = require('../webcetas.node/views').view;
var db = require('../utils/db');
var mongo = require('../db').db('closume', '127.0.0.1', 27017);
var parse = require('../webcetas.node/utils/proto').parse;
var fs = require('fs');

view('/home/([a-z]+).html',
function home(req, res, page)
{
    var out = res;
    var $ = this;
    fs.readFile('./views/html/' + page +'.html', function(err, data)
    {
        if(err) throw err;
        out.write(data);
        out.end();
    });
});

view('^(/|/resume)[?/]?',
function resume(req, res, args)
{
    res.writeHead(200, {'Content-type' : 'text/plain;charset=utf-8'});
    if(req.method == 'GET') {
        var vt = parse(req);
        var params = vt.params();
        var mailid = params.mailid;
        mongo.connect(function(err, db) {
            mongo.error(err);
            mongo.table('resumes', db, function(err, coll) {
                coll.find({'Mailid' : mailid},
                            function(err, cursor) {
                    cursor.toArray(function(err, docs) {
                        if (docs && docs.length > 0) 
                            fmt(docs[0], write(res));
                        else
                            fmt("Invalid mailId", write(res));
                        res.end();
                    });
                });
            });
        });
//        fmt(db.resume, write(res));
    }
    else if(req.method == 'POST')
    {
        req.on('data', function(data) {
           data = eval("(" + data.toString() + ")");
           mongo.connect(function (err, db) {
                mongo.table('resumes', db, function (err, coll) {
                    coll.insert(data, function (err, docs) {
                        fmt(mongo.response ({message : 'success'}),
                              write(res));
                        res.end();
                        mongo.release();
                    });
                });
            });
        }); 
    }
});

view('/resume/([a-zA-Z]+)[/]?$',
function sub(req, res, args)
{
    var key = args[0].charAt(0).toUpperCase() + args[0].slice(1);
    res.writeHead(200, {'Content-type' : 'text/plain;charset=utf-8'});
    fmt(db.resume[key], write(res));
    res.end();
});

view('/blog[/]?$',
function(req, res)
{
    res.writeHead(302, {'Location' : 'http://www.kailashnath.posterous.com'});
    res.end();
});

view('/vtest/([0-9]+)/([0-9]+)/$',
    function vtest(req, res, args)
    {
        res.end("kailash test success !!" + args);
    });

function write(res) 
{
    return function(data) { res.write(data); };
}

