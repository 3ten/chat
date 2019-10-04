var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
    database: 'notes',
    host: "localhost",
    user: "seva",
    password: "1234"
});


// function Message() {

// }
// var a = new Message();

// conn.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     conn.query("SELECT * From users", function (err, result, fields) {
//         if (err) throw err;

//     });
// });
