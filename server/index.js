const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
var tools = require('./mysql');

const port = 3000;
const hostname = '192.168.0.2';

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        io.emit("message", message);
        
        console.log(message);
    })
});

app.use(express.static(publicPath));
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});



