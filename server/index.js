const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const port = 3000;
const hostname = '192.168.11.146';

<<<<<<< HEAD
const mysql_script = require('./mysql');
=======
const port = 3000;
const hostname = '192.168.11.11';
>>>>>>> 76bf039b3858d21d6a073da57054c0d0c3e7918a

const app = express();


const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');

var users = [];
var connections = [];


io.sockets.on('connection', (socket) => {

    let room;
    socket.on('create', (room_name) => {
        room = room_name;
        socket.join(room);
        connections.push(socket);

        console.log("it works!");
        mysql_script.connection.query("SELECT content FROM messages", (err, results, fields) => {
            if (err) console.log(err);
            results.forEach(content => {
                console.log(content);
                let newMessages = {content: content, room: room};
                socket.emit("getMessages", newMessages);
            });
        });
    });

    // socket.on('connection', () => {
    //     console.log("it works!");
    //     connection.query("SELECT content FROM messages", (err, results, fields) => {
    //         if (err) console.log(err);
    //         results.forEach(content => {
    //             console.log(content);
    //             let newMessages = {content: content, room: room};
    //             io.sockets.in(room).emit("getMessages", newMessages);
    //         });
    //     }); 
    // });

    socket.on('sendMessage', (message) => {
        let newMessages = {content: message, room: room};
        io.sockets.in(room).emit("addMessage", newMessages);
    });
<<<<<<< HEAD
    
=======

>>>>>>> 76bf039b3858d21d6a073da57054c0d0c3e7918a
    socket.on('disconnect', () => {
        connections.splice(socket, 1);
    });


});

app.use(express.static(publicPath));
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});



