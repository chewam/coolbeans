var config = require('./config');
    mysql = require('mysql');


/**
 * Database constructor
 */
function Database() {
    client = mysql.createClient({
      user: config.user,
      password: config.password
    });
    client.query('USE ' + config.database);
    console.log("Database connection: OK");
    return client;
};


/**
 * Expose Database
 */
module.exports = Database();
