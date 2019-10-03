var socket = null;
var app = new Vue({
    el: "#app",
    data: {
        message: '',
        messages: []
    },
    methods: {
        sendMessage: function() {
            socket.emit('message', this.message);
            this.message = '';
        }
    },
    created: function() {
        socket = io();
    },
    mounted: function() {
        socket.on('message', function(message){
            app.messages.push(message);
        })
    }
});