//send stuff
var client = {
  socket: io.connect('http://127.0.0.1:4200'),
  askNewPlayer: function(){
    this.socket.emit('newplayer');
  },
  sendClick: function(x, y){
    this.socket.emit('click',{x:x,y:y});
  }  
};

//handle responses
client.socket.on('newplayer',function(data){
    game.state.states['play'].addNewPlayer(data.id,data.x,data.y);
});

client.socket.on('allplayers',function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
        game.state.states['play'].addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});

client.socket.on('remove', function(playerId){
  game.state.states['play'].removePlayer(playerId);
});

client.socket.on('move', function(data){
  game.state.states['play'].movePlayer(data.id, data.x, data.y);
});
