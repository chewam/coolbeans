var sys = require('sys'),
    events = require('events'),
    Cb = require('./index.js');


/**
 * Tables constructor
 */
function Tables(db) {
    // this.data = [];
    this.db = Cb.db;
    this.dataLoaded = 0;
    events.EventEmitter.call(this);
    this.loadPg(21);
    this.loadPi(21);
    this.loadRnt(21);

    this.on('load', this.onLoad);

};
sys.inherits(Tables, events.EventEmitter);


Tables.prototype.onLoad = function() {
    this.dataLoaded++;
    if (this.dataLoaded === 3) {
        this.emit('dataloaded', this);
    }
}

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
        self.Pg = self.Pg || {};
        self.Pg[oxygen] = self.Pg[oxygen] || {};
        self.Pg[oxygen].data = results;
        self.setDistinctPgDepth(oxygen);
        // self.db.end();
        self.emit('load', 'Pg', oxygen);
    };

    this.db.query(query, func);
};

Tables.prototype.setDistinctPgDepth = function(oxygen) {
    var depth = [],
        d = this.Pg[oxygen].data;
    for (var i = 0, l = d.length; i < l; i++) {
        if (depth.indexOf(d[i].depth)) {
            depth.push(d[i].depth);
        }
    }
    this.Pg[oxygen].depth = depth;
}

Tables.prototype.getPgDepth = function(depth, oxygen) {
    var d = 0;
        depths = this.Pg[oxygen].depth;
    for (var i = 0, l = depths.length; i < l; i++) {
        d = depths[i];
        if (d >= depth) break;
    }
    return d;
}

Tables.prototype.getPg = function(depth, duration, oxygen) {
    var pg = 0,
        d = this.Pg[oxygen].data;

    depth = this.getPgDepth(depth, oxygen);

    for (var i = 0, l = d.length; i < l; i++) {
        if (d[i].depth === depth) {
            pg = d[i].pg;
            if (d[i].duration >= duration) break;
        }
    }
    return pg;
}

/**
 * Load pi table asynchronously from database
 * 
 * @return {Void}
 * @api public
 */
Tables.prototype.loadPi = function(oxygen) {
    var self = this,
        query = 'SELECT pg_start AS startPg, pg_end AS endPg, time_min AS minTime, time_max AS maxTime FROM pressure_intervals WHERE oxygen = '+oxygen+' ORDER BY pg_start, time_min';

    var func = function(err, results, fields) {
        if (err) { throw err; }
        self.Pi = self.Pi || {};
        self.Pi[oxygen] = self.Pi[oxygen] || {};
        self.Pi[oxygen].data = results;
        self.emit('load', 'Pi', oxygen);
    };

    this.db.query(query, func);
};


Tables.prototype.getStartPg = function(endPg, interval, oxygen) {
    var pg = 0,
        d = this.Pi[oxygen].data;

    for (var i = 0, l = d.length; i < l; i++) {
        if (d[i].startPg === endPg) {
            if (d[i].minTime <= interval && interval <= d[i].maxTime) {
                pg = d[i].endPg;
                break;
            }
        }
    }

    return pg;
}


/**
 * Load rnt table asynchronously from database
 * 
 * @return {Void}
 * @api public
 */
Tables.prototype.loadRnt = function(oxygen) {
    var self = this,
        query = 'SELECT pg, depth, rnt  FROM residual_nitrogen_times WHERE oxygen = '+oxygen+' ORDER BY pg, depth';

    var func = function(err, results, fields) {
        if (err) { throw err; }
        self.Rnt = self.Rnt || {};
        self.Rnt[oxygen] = self.Rnt[oxygen] || {};
        self.Rnt[oxygen].data = results;
        self.setDistinctRntDepth(oxygen);
        self.emit('load', 'Rnt', oxygen);
    };

    this.db.query(query, func);
};

Tables.prototype.setDistinctRntDepth = function(oxygen) {
    var depth = [],
        d = this.Rnt[oxygen].data;
    for (var i = 0, l = d.length; i < l; i++) {
        if (depth.indexOf(d[i].depth)) {
            depth.push(d[i].depth);
        }
    }
    this.Rnt[oxygen].depth = depth;
}

Tables.prototype.getRntDepth = function(depth, oxygen) {
    var d = 0;
        depths = this.Rnt[oxygen].depth;
    for (var i = 0, l = depths.length; i < l; i++) {
        d = depths[i];
        if (d >= depth) break;
    }
    return d;
}

Tables.prototype.getRnt = function(depth, pg, oxygen) {
    var rnt = 0,
        d = this.Rnt[oxygen].data;

    depth = this.getRntDepth(depth, oxygen);

    for (var i = 0, l = d.length; i < l; i++) {
        if (d[i].depth === depth && d[i].pg === pg) {
            rnt = d[i].rnt;
            break;
        }
    }
    return rnt;
}


/**
 * Expose tables
 */
module.exports = new Tables();