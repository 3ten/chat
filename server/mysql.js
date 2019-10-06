const cookieParser = require('cookie-parser');
const session = require('express-session');
const MYSQLStore = require('connect-mysql')(session);
const mysql = require('mysql');

module.exports = {
    createStore: function () {
        let config = {
            user: 'seva',
            password: '1234',
            database: 'chat',
            port: 3306,
        };
        return new MYSQLStore(config);
    }
};


/*console.log('Get connection ...');

var conn = mysql.createConnection({
    database: 'notes',
    host: "localhost",
    user: "seva",
    password: "1234"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("SELECT * From users", function (err, result, fields) {
        if (err) throw err;

    });
});*/

