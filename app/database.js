var mysql = require('mysql');


/**
 * Database constructor
 */
function Database() {
    client = mysql.createClient({
      user: 'root',
      password: 'juX2p0mX'
    });
    client.query('USE coolbeans');
    console.log("Database connection: OK");
    return client;
};


/**
 * Expose Database
 */
module.exports = Database();
