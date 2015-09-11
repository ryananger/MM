ig.module(
	'game.entities.blinker'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityBlinker = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/chat_blinker.png',1,20),
		blinker_img: new ig.Image ('media/chat_blinker.png'),

		size: {x: 1, y: 20},

		font: new ig.Font( 'media/font.png' ),

		init: function (x,y) {
			this.parent();

			this.pos.x = x;
			this.pos.y = y;

			this.addAnim('blink', 0.5, [0,1]);
			this.currentAnim = this.anims.blink;
		},

		update: function () {
			this.parent();

			if (!ig.game.Chat.blinkerOn) 
			{
				this.kill();
			}
		},

		draw: function () {
			this.parent();
		}
	});
});

