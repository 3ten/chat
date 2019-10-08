const cookieParser = require('cookie-parser');
const session = require('express-session');
const MYSQLStore = require('connect-mysql')(session);
const mysql = require('mysql');

module.exports = {
    createStore: function () {
        let config = {
            user: 'root',
            password: '',
            database: 'chat',
            port: 3306,
        };
        return new MYSQLStore(config);
    }
};


console.log('Get connection ...');

var config = {
    database: 'chat',
    host: "localhost",
    user: "root",
    password: ""
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(config); // Recreate the connection, since
                                                  // the old one cannot be reused.
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });

}

handleDisconnect();
module.exports.connection = connection;

