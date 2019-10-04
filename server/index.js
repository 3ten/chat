const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
// const bootstrap =require('bootstrap');
var tools = require('./mysql');

const port = 3000;
const hostname = '192.168.0.2';

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

var users = [];
var connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);

    socket.on('disconnect', () => {
        connections.splice(socket, 1);
    });

    socket.on('sendMessage', (message) => {
        io.emit("addMessage", message);
        
        console.log(message);
    });
});

app.use(express.static(publicPath));
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});



