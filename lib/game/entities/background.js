ig.module(
	'game.entities.background'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityBackground = ig.Entity.extend({
		//animSheet: new ig.AnimationSheet ('media/tbs_bg.png',1320,720),
		bg_img: new ig.Image ('media/tbs_bg.png'),

		size: {x: 1320, y: 720},

		font: new ig.Font( 'media/font.png' ),

		init: function (x,y) {
			this.parent();
		},

		update: function () {
			this.parent();
		},

		draw: function () {
			this.bg_img.draw(0,0);
		}
	});
});

