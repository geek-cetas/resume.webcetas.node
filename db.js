var mongodb = require('mongodb');

var db = function (name, host, port, options) {
    var obj = new mongo (name, host, port, options);
    return obj;
}

var mongo = function(name, host, port, options){
    this.name = name; this.host = host; this.port = port,
    this.options = options == null ? {} : options;
}

mongo.prototype.connect = function(callback) { 
    var db = new mongodb.Db(this.name,
                             new mongodb.Server(this.host,
                                                 this. port,
                                                 this.options));
    db.open(function (err, dbase) {

    if(err != null) {
        callback(err, null);
    }
    else {
        callback(null, dbase);
    }
    });
};

mongo.prototype.table = function(name, db, callback) {
    var tbl = db.collection(name, callback);
};

mongo.prototype.error = function(err) {
    if(err != null) {
        this.release();
        throw err;
    }
};

mongo.prototype.response = function(obj) {
    console.log(obj);
    return { code : obj.code != null ? obj.code : 200,
             message : obj.message,
             data : obj.opts }; 
}

mongo.prototype.release = function() {
}

module.exports = {db : db};
