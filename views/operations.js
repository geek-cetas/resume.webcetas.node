var fmt = require('../utils/formats').fmt;
var view = require('../webcetas.node/views').view;
var fs = require('fs');
var ds = require('../resume').resume;
var ex = require('../webcetas.node/ex').ex;

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

//view('^(/|/resume)[?/]?',
view('^(/|/resume/([a-zA-Z.@0-9]+)?(/)?)?$',
function resume(req, res, args)
{
    console.log( args );
    res.writeHead(200, {'Content-type' : 'text/plain;charset=utf-8'});
    var conn = ds();
    if(req.method == 'GET') {
        var mailid = args[1];
        conn.on('connect', function() {
             this.find( mailid );
        }).on( 'find', function( docs ) {
            if( docs.length > 0 )
                {
                    delete docs[0]._id;
                    fmt( docs[0], write( res ));
                    res.end();
                }
            else
                ex( conn, new Error( "Invalid mail id" ));
        });
   }
    else if(req.method == 'POST')
    {
        req.on('data', function(data) {
           data = eval("(" + data.toString() + ")");
            console.log(data);
           if( data.api_key != '03k41a0413' )
               ex( conn, new Error( "Invalid api key" ));
           else
               conn.on( 'connect', function() {
                    delete data.api_key;
                    this.save( data );
                }).on( 'insert', function( docs ) {
                    res.end();
                });
        }); 
    }
    conn.on( 'error', function( err, msg ) { 
                res.write( JSON.stringify( msg ));
                res.end() });
    conn.do();
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

