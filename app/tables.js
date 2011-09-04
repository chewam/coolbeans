var sys = require('sys'),
    events = require('events'),
    Cb = require('./index.js');


/**
 * Tables constructor
 */
function Tables(db) {
    // this.data = [];
    this.db = Cb.db;
    this.Pg = {
        '21': {}
    };
    // this.dataLoaded = 0;
    events.EventEmitter.call(this);
    this.loadPg(21);
    // this.loadPi();
    // this.loadRnt();
};
sys.inherits(Tables, events.EventEmitter);


/**
 * Load pg table asynchronously from database
 * 
 * @return {Void}
 * @api public
 */
Tables.prototype.loadPg = function(oxygen) {
    var self = this,
        query = 'SELECT pg, depth, duration, oxygen, pp FROM pg WHERE oxygen = '+oxygen+' ORDER BY pg, depth';

    var func = function(err, results, fields) {
        if (err) { throw err; }
        self.Pg[oxygen].data = results;
        self.setDistinctDepth(oxygen);
        self.db.end();
    };

    this.db.query(query, func);
};

Tables.prototype.setDistinctDepth = function(oxygen) {
    var depth = [],
        d = this.Pg[oxygen].data;
    for (var i = 0, l = d.length; i < l; i++) {
        if (depth.indexOf(d[i].depth)) {
            depth.push(d[i].depth);
        }
    }
    this.Pg[oxygen].depth = depth;
}

Tables.prototype.getPg = function(depth, duration, oxygen) {
    var pg = 0,
    d = this.Pg[oxygen].data;

    depth = this.getDepth(depth, oxygen);

    for (var i = 0, l = d.length; i < l; i++) {
        if (d[i].depth === depth) {
            // console.log("****", d[i]);
            pg = d[i].pg;
            if (d[i].duration >= duration) break;
        }
    }
    console.log('Tables.prototype.getPg', depth, pg);
    return pg;
}


Tables.prototype.getDepth = function(depth, oxygen) {
    var d = 0;
        depths = this.Pg[oxygen].depth;
    for (var i = 0, l = depths.length; i < l; i++) {
        d = depths[i];
        if (d >= depth) break;
    }
    return d;
}

/**
 * Load pi table asynchronously from database
 * 
 * @return {Void}
 * @api public
 */
Tables.prototype.loadPi = function() {
    var self = this,
        query = 'SELECT * FROM pressure_intervals';

    var func = function(err, results, fields) {
        if (err) { throw err; }
        self.Pi = results;
        self.db.end();
    };

    this.db.query(query, func);
};


/**
 * Load rnt table asynchronously from database
 * 
 * @return {Void}
 * @api public
 */
Tables.prototype.loadRnt = function() {
    var self = this,
        query = 'SELECT * FROM pressure_intervals';

    var func = function(err, results, fields) {
        if (err) { throw err; }
        self.Rnt = results;
        self.db.end();
    };

    this.db.query(query, func);
};



/**
 * Listener called after a load of data
 * 
 * @param {String} table
 * @param {Array} results
 * @return {Void}
 * @api private
 */
// Tables.prototype.onLoad = function(table, results) {
//     this.dataLoaded++;
//     this.data[table] = results;
//     if (this.dataLoaded === 3) {
//         this.dataLoaded = true;
//         this.emit('load', this, this.data);
//     }
// };


/**
 * Expose Tables
 */
module.exports = new Tables();