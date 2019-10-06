const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');


const port = 80;
const hostname = '192.168.1.7';

const app = express();


const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public');

var users = [];
var connections = [];


io.sockets.on('connection', (socket) => {

    let room;
    socket.on('create', function (room_name) {
        room = room_name;
        socket.join(room);
        connections.push(socket);
    });

    socket.on('sendMessage', (message) => {
        io.sockets.in(room).emit("addMessage", message);
        //console.log(message);
    });
    socket.on('disconnect', () => {
        connections.splice(socket, 1);
    });


});

app.use(express.static(publicPath));
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});



