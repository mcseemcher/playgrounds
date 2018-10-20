

var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/',function(req, res) {
    console.log(" / requested !");
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serv.listen(2000);
console.log("Hiker server started!");

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});
io.sockets.on('connection',function(socket){
    //debugger;
    console.log('socket connected: '+socket.conn.id);

    socket.id = Math.random();
    socket.x = 0;
    socket.y = 0;
    SOCKET_LIST[socket.id] = socket;

    socket.on("Start", function(data) {
        console.log( "Start: " + data );
    });
});

setInterval(function() {
    for(var i=0; i <=SOCKET_LIST.length; i++) {
        debugger;
        var socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        socket.emit('newPosition',{
            x:socket.x,
            y:socket.y
        });
    }
}, 1000/25);
