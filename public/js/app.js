var socket = null;
var app = new Vue({
    el: "#app",
    data: {
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
    },
    mounted: function () {
        socket.on('addMessage', function (message) {
            app.messages.push(message);
        })
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
            socket.emit('create', el);
        }
    }
});




