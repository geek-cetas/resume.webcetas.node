var emitter = require('events').EventEmitter;
views = [];


var view = function( regx, v ) {
     if( regx == null || v == null )
        return;

     views[views.length] = [regx, v];
 };

function serve( path )
{
    this.path = path;
}

serve.prototype = new emitter;
serve.prototype.run = function()
{
    for(var i = 0; i < views.length; i++ )
    {
        var matches = this.path.match( views[i][0] );
        if( matches != null )
        {
           this.emit('match', views[i][1],
                              matches.slice( 1, matches.length ));
           return;
        }
    }
    this.emit('fail', 'Invalid url : ' + this.path);
}

function lookup( path )
{
    var cls = new serve(path);
    return cls;
}

module.exports = { view : view,
                   match : lookup };
