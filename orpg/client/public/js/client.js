var client = {
  socket: io.connect('http://127.0.0.1:4200'),
  askNewPlayer: function(){
    this.socket.emit('newplayer');
  }  
};


client.socket.on('newplayer',function(data){
    game.state.states['play'].addNewPlayer(data.id,data.x,data.y);
});

client.socket.on('allplayers',function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
        game.state.states['play'].addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});