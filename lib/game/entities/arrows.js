ig.module(
	'game.entities.arrows'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityArrows = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/arrows.png',60,60),
		size: {x: 60, y: 60},

		init: function (x,y) {
			
			this.addAnim('base', 1, [0]);
			this.currentAnim = this.anims.base;

			this.parent(x,y);

		},

		update: function () {
			this.parent();
		},
	});
});

