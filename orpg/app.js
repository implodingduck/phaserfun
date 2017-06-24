// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/../node_modules')); 
app.use(express.static('client/public'));
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/client/index.html');
});
console.log('hello world');
server.listen(4200);  
console.log('hello world 4200');


var connections = [];
var playerId = 0;
io.on('connection', function(socket) {  
    socket.player = {
       id: ++playerId,
       x: randomInt(100,400),
       y: randomInt(100,400)
    }
    connections.push(socket)
    
    console.log('socket connected...');
    
    socket.on('newplayer',function(){
      console.log('new player action!');
      socket.emit('playerid', socket.player.id);
      socket.emit('allplayers',getAllPlayers());
      socket.broadcast.emit('newplayer',socket.player);
      
      socket.on('click',function(data){
        console.log('click to '+data.x+', '+data.y);
        socket.player.x = data.x;
        socket.player.y = data.y;
        io.emit('move',socket.player);
      });
      
      socket.on('disconnect',function(){
        io.emit('remove',socket.player.id);
      });
    });

});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}