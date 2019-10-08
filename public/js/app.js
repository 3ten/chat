var socket = null;
var room = 'obsh';
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
        socket.emit('create', 'obsh');
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
        chats: [
            {id: 1},
            {id: 2}
        ],
        chat: ''
    },
    methods: {
        click: function (el) {
            room = el;
            app.room = el;
            console.log(room);
            socket.emit('create', room);
        }
    }
});




