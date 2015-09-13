ig.module(
	'game.entities.playbutton'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityPlayButton = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/playbutton.png',160,50),
		size: {x: 160, y: 50},
		clicked: false,

		init: function (x,y) {
			
			this.addAnim('base', 1, [0]);
			this.currentAnim = this.anims.base;

			this.parent(x,y);

		},

		update: function () {
			this.parent();
		},

		inFocus: function() {
    		return (
		       (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
		       ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
		       (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
		       ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
		    );
		}
	});
});

