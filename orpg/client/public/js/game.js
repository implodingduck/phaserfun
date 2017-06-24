var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

game.players = {};

game.state.add('play', {
  preload: function() {
    game.load.image('skeleton', 'images/skeleton.png');
    game.load.image('background', 'images/background.png');
    game.load.image('sky', 'images/sky.png');
  },
  init: function(){
    game.stage.disableVisibilityChange = true;
  },
  create: function() {
    var state = this;
    this.background = this.game.add.group();
    this.background.inputEnableChildren = true;
    this.background.create(0, 300, 'sky').anchor.setTo(0.5, 0.5);
    this.background.create(0, 500, 'background').anchor.setTo(0.5, 0.5);
    client.askNewPlayer();
    this.background.onChildInputUp.add(this.getCoordinates, this);
  },
  render: function() {
    game.debug.text('Adventure Awaits!', 250, 290);
  },
  addNewPlayer: function (id, x, y){
    game.players[id] = game.add.text(x, y, id, { font: "15px Arial", fill: "#ff00ff" });
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
    var duration = distance*10;
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
  }

 
});
 

game.state.start('play');