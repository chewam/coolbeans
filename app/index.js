var exports = module.exports;

console.log("** Cb construct");

exports.db = require('./database');

exports.tables = require('./tables');

exports.Dive = require('./dive');
