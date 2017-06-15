var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

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
    this.background.create(0, 300, 'sky').anchor.setTo(0.5, 0.5);
    this.background.create(0, 500, 'background').anchor.setTo(0.5, 0.5);
    client.askNewPlayer();
  },
  render: function() {
    game.debug.text('Adventure Awaits!', 250, 290);
  },
  addNewPlayer: function (id, x, y){
    game.add.text(x, y, id, { font: "15px Arial", fill: "#ff00ff" });
  }

 
});
 

game.state.start('play');