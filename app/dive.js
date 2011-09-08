var sys = require('sys'),
    events = require('events'),
    Cb = require('./index.js');


/**
 * Dive constructor
 */
function Dive(data) {
    this.db = Cb.db;
    this.defaultOxygen = 21;
    this.loadData(data);
    events.EventEmitter.call(this);
};
sys.inherits(Dive, events.EventEmitter);


/**
 * Load dive data asynchronously from database
 * 
 * @param {Function} callback
 * @return {Void}
 * @api public
 */
Dive.prototype.load = function(id, callback) {
    var self = this,
        query = 'SELECT * FROM dives WHERE id = ' + id;

    var func = function(err, results, fields) {
        if (err) { throw err; }
        self.data = results;
        self.emit('load', self, self.data);
        callback.call(self, self.data);
        self.db.end();
    };

    self.db.query(query, func);
};


/**
 * Set default data values
 * 
 * @param {Object} data
 * @return {Void}
 * @api public
 */
Dive.prototype.loadData = function(data) {
    if (!data) {
        this.data = {};
        return;
    }

    this.data = {};

    this.data.oxygen = parseInt(data.oxygen || this.defaultOxygen);

    this.data.lastPg = data.lastPg || 0;
    this.data.levels = this.getLevels(data);
    this.data.maxDepth = this.getMaxDepth();
    this.data.interval = this.getInterval(data);
    this.data.startPg = this.getStartPg(data);
    this.data.rnt = this.getRnt();
};


/**
 * Set default data values
 * 
 * @param {Object} data
 * @return {Void}
 * @api public
 */
Dive.prototype.getLevels = function(data) {
    var levels = [], v, lvs;
    if (data.levels) {
        lvs = data.levels.split('|');
        for (var i = 0, l = lvs.length; i < l; i++) {
            v = lvs[i].split(',');
            levels.push({
                depth: parseInt(v[0]),
                duration: parseInt(v[1])
            });
        }
    } else {
        levels.push({
            depth: parseInt(data.depth || 0),
            duration: parseInt(data.duration || 0)
        });
    }
    return levels;
}


/**
 * Set default data values
 * 
 * @param {Object} data
 * @return {Void}
 * @api public
 */
Dive.prototype.getInterval = function(data) {
    return parseInt(data.interval) || 0;
}


/**
 * Set default data values
 * 
 * @param {Object} data
 * @return {Void}
 * @api public
 */
Dive.prototype.getStartPg = function(data) {
    var pg = 0,
        lastPg = this.data.lastPg,
        interval = this.data.interval;

    if (data.startPg) pg = data.startPg;
    else if (interval && lastPg) {
        pg = Cb.tables.getStartPg(lastPg, interval, this.data.oxygen);
    }

    return pg;
}


/**
 * Set default data values
 * 
 * @param {Object} data
 * @return {Void}
 * @api public
 */
Dive.prototype.getRnt = function() {
    var pg = this.data.startPg,
    depth = this.data.maxDepth;
    return Cb.tables.getRnt(depth, pg, this.data.oxygen);
}


/**
 * Compute dive data
 * 
 * @return {Object} this
 * @api public
 */
Dive.prototype.compute = function() {
    // this.computeDuration();
    // this.computeMaxDepth();
    this.computeEndPg();
    this.setSafetyStop();
    return this;
};


/**
 * Compute dive data
 * 
 * @return {Object} this
 * @api public
 */
Dive.prototype.computeDuration = function() {
    var levels = this.data.levels, duration = 0;
    for (var i = 0, l = levels.length; i < l; i++) {
        duration += levels[i].duration;
    }
    this.data.totalDuration = duration;
    return this;
};


/**
 * Compute dive data
 * 
 * @return {Object} this
 * @api public
 */
Dive.prototype.getMaxDepth = function() {
    var levels = this.data.levels, depth = 0;
    for (var i = 0, l = levels.length; i < l; i++) {
        if (depth < levels[i].depth) {
            depth = levels[i].depth;
        }
    }
    return depth;
};


/**
 * Compute dive data
 * 
 * @return {Object} this
 * @api public
 */
Dive.prototype.computeEndPg = function() {
    var d = this.data, c = 0,
        depth, rnt, duration, pg = 0,
        offset = 'A'.charCodeAt() - 1;

    for (var j = 0, m = d.levels.length; j < m; j++) {
        duration = d.levels[j].duration;
        depth = d.levels[j].depth;
        if (depth && duration) {
            rnt = this.data.maxDepth === depth ? this.data.rnt : 0;
            pg += Cb.tables.getPg(depth, duration + rnt, this.data.oxygen).charCodeAt(0) - offset;
        }
    }

    if (pg) pg = String.fromCharCode(pg + offset);

    this.data.endPg = pg;

    return this;
};


/**
 * Compute dive data
 * 
 * @return {Object} this
 * @api public
 */
Dive.prototype.setSafetyStop = function() {
    var safetyStop = Cb.tables.getSafetyStop(this.data.endPg, this.data.maxDepth, this.data.oxygen);
    this.data.safetyStop = !!safetyStop;
    this.data.noDecompressionLimit = safetyStop === 2;
}

/**
 * Expose Dive
 */
module.exports = Dive;