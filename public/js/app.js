var socket = null;
var room = 1;
var app = new Vue({
    el: "#app",
    data: {
        room: room,
        message: '',
        messages: []
    },
    methods: {
        sendMessage: function () {
            socket.emit('sendMessage', this.message);
            this.message = '';
        }
    },
    created: function () {
        socket = io();
        socket.emit('create', room);
        socket.on('getMessages', (message) => {
            app.messages.push(message);
        });
    },
    mounted: function () {
        socket.on('addMessage', function (message) {
            app.messages.push(message);
        });
    }
});

var chats = new Vue({
    el: '#chats',
    data: {
        chats: [],
        chat: '',
        currentRoom:room
    },
    methods: {
        click: function (el) {
            room = el;
            app.room = room;
            chats.currentRoom = room;
            socket.emit('joinRoom', room);
        }
    },
    created: function() {
        socket.emit('getChats');
        socket.on('sendChats', (room) => {
            chats.chats.push(room);
        });
    }
});




