const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const port = 3000;
const hostname = '192.168.11.146';

const mysql_script = require('./mysql');

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
        mysql_script.connection.query("SELECT content FROM messages WHERE chat_id=1", (err, results, fields) => {
            if (err) console.log(err);
            results.forEach(content => {
                console.log(content);
                let newMessages = {content: content, room: room};
                socket.emit("getMessages", newMessages);
            });
        });
    });

    socket.on('joinRoom', (room_name) => {
        room = room_name;
        socket.join(room);

    });

    socket.on('getChats', () => {
        mysql_script.connection.query("select ct.name,ct.chat_id,ct.isPrivate from party pt inner join chats ct where pt.user_id = 1", (err, results, fields) => {
            if (err) console.log(err);
            results.forEach(chat => {
                let room = {id: chat.chat_id, name: chat.name};
                console.log(room);
                socket.emit("sendChats", room);
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
    
    socket.on('disconnect', () => {
        connections.splice(socket, 1);
    });


});

app.use(express.static(publicPath));
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});



