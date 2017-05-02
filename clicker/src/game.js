var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
 
game.state.add('play', {
  preload: function() {
    game.load.image('skeleton', 'assets/skeleton.png');
    game.load.image('background', 'assets/background.png');
    game.load.image('sky', 'assets/sky.png');
  },
  create: function() {
    var state = this;
    this.background = this.game.add.group();
    this.background.create(0, 300, 'sky').anchor.setTo(0.5, 0.5);
    this.background.create(0, 500, 'background').anchor.setTo(0.5, 0.5);
    
    this.skeletonSprite = game.add.sprite(450, 290, 'skeleton');
    this.skeletonSprite.anchor.setTo(0.5, 0.5);
    this.skeletonSprite.tint = 0xff00ff;
    this.skeletonSprite.inputEnabled = true;
    this.skeletonSprite.events.onInputDown.add(this.onClickMonster, state);
  },
  render: function() {
    game.debug.text('Adventure Awaits!', 250, 290);
  },
  onClickMonster(sprite, pointer){
    console.log('clicked!');
    console.log(sprite);
    sprite.tint = 0x00000a;
  } 
 
});
 

game.state.start('play');