var dba = require('./db').db('closume', '127.0.0.1', 27017);
var ev = require('events').EventEmitter;
var ex = require('./webcetas.node/ex').ex;

var resume = function() {
}

resume.prototype = new ev();

resume.prototype.throw = function(err) {
    throw err;
}

resume.prototype.do = function() {
    var $ = this;

    dba.connect( function( err, dbase ) {
        ex( $, err, function() {
            dba.table( 'resumes', dbase, function( err, coll ) {
                ex( $, err, function() {
                    $.table = coll;
                    $.emit( 'connect' );
                });
            });
        });
    });
}

resume.prototype.save = function( doc ) {
    var $ = this;
    $.once( 'find', function( docs ) {
            if( docs.length > 0 )
                ex( $, new Error("Duplicate entry") );
            else {
                 $.table.insert( doc, function( docs ) {
                        $.emit( 'insert', docs );
                });
            }
        });
    $.find( doc.Mailid );
   }

resume.prototype.find = function( mailid ) {
    var $ = this;
    if( !mailid )
        ex( $, new Error("Invalid mailid"));
    else
        this.table.find( {'Mailid' : mailid}, function( err, cursor ) {
            ex( $, err, function() {
                cursor.toArray( function( err, docs ) {
                    ex( $, err, function() {
                        $.emit( 'find', docs );
                    });
                });
            });

        });
}

resume.prototype.remove = function( mailid ) {
}

var newResume = function() {
    var obj = new resume();
    return obj;
}

module.exports = {resume : newResume};

