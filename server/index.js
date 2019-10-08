const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const port = 3000;
const hostname = '192.168.11.11';

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

        mysql_script.connection.query("SELECT * FROM messages ", (err, results, fields) => {
            if (err) console.log(err);
            results.forEach(content => {
                console.log(content);
                let newMessages = {content: content.content, room: content.chat_id};
                socket.emit("getMessages", newMessages);
            });
        });
    });

    socket.on('joinRoom', (room_name) => {
        room = room_name;
        socket.join(room);

    });

    socket.on('getChats', () => {
        mysql_script.connection.query("select ct.name,ct.chat_id,ct.isPrivate from party pt left join chats ct on pt.chat_id=ct.chat_id where pt.user_id = 1", (err, results, fields) => {
            if (err) console.log(err);
            results.forEach(chat => {
                let room = {id: chat.chat_id, name: chat.name};
                console.log(room);
                socket.emit("sendChats", room);
            });
        });
    });


    socket.on('sendMessage', (message) => {
        let newMessages = {content: message, room: room};
        mysql_script.connection.query("insert into messages(chat_id,user_id,content,date) values("+room+","+"1,'"+message+"','2001-11-11 11:11:11')", (err) => {
            if (err) console.log(err);
            });
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



