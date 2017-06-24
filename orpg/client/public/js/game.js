var game = new Phaser.Game(800, 640, Phaser.AUTO, '');

game.players = {};
game.playerId = 0;

game.state.add('boot', {
  create: function() {
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';
    this.state.start('preload');
  }
});

game.state.add('preload', {
  preload: function() {

    //load game assets
    this.load.tilemap('basic', '/maps/basic.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('gameTiles', '/images/basic_tiles.png');

    
  },
  create: function() {
    this.state.start('play');
  }
});

game.state.add('play', {
  preload: function() {

  },
  init: function(){
    game.stage.disableVisibilityChange = true;
  },
  create: function() {
    this.map = this.game.add.tilemap('basic');
 
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('basic_tiles', 'gameTiles');
 
    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');
 
    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    
    //create enemies
    var results = this.findObjectsByType('enemy', this.map, 'enemies')
    this.enemies = [];
    for(var i = 0; i < results.length; i++){
      this.enemies[i] = this.game.add.graphics(results[i].x, results[i].y);
      this.enemies[i].beginFill(0xff6666, 1);
      this.enemies[i].drawCircle(32, 32, 60);
      this.enemies[i].endFill();
    }
    
    client.askNewPlayer();
    
  },
  dragTokenStart: function(token, pointer, x, y){
    console.log('drag start! ' + x + ', ' + y );
  },
  dragTokenStop: function(token, pointer){
    console.log('drag stop! ' + pointer.x + ', ' + pointer.y);
    console.log('vs token ' + token.x + ', ' + token.y);
    token.x = Math.round(token.x/64) * 64;
    token.y = Math.round(token.y/64) * 64;
    
    client.sendClick(token.x,token.y);
  },
  findObjectsByType: function(type, map, layer){
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  },
  render: function() {
    //game.debug.text('Adventure Awaits!', 250, 290);
  },
  addNewPlayer: function (id, x, y){
    var newX = Math.round(x/64) * 64;
    var newY = Math.round(y/64) * 64;
    
    if(!game.players[id]){
      game.players[id] = this.game.add.graphics(newX, newY);
      game.players[id].beginFill(0x6666ff, 1);
      game.players[id].drawCircle(32, 32, 60);
      game.players[id].endFill();
      game.players[id].endFill();
      game.players[id].addChild(game.add.text(22, 22, id, { font: "16px Arial", fill: "#ffffff" }));
      if(id === game.playerId){    
        game.players[id].inputEnabled = true;
        game.players[id].input.enableDrag();
        game.players[id].events.onDragStart.add(this.dragTokenStart, this);
        game.players[id].events.onDragStop.add(this.dragTokenStop, this);
      }
    }
    
    
  },
  setPlayerId: function(id){
    game.playerId = id;
    $('h1').html('Hello ' + id + '!');
  },
  removePlayer: function (id){
    game.players[id].destroy();
    delete game.players[id];
  },
  getCoordinates: function (layer, pointer){
    console.log('click!')
    client.sendClick(pointer.worldX,pointer.worldY);
  },
  movePlayer: function (id, x, y){
    var player = game.players[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var duration = distance*3;
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
  }

 
});
 

game.state.start('boot');