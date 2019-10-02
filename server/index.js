const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const port = 3000;
const hostname = '192.168.11.148';

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

io.on('connection', () => {
    console.log('SocketIO is connected');
});

app.use(express.static(publicPath));
server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});