ig.module(
	'game.entities.startbutton'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityStart = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/startbutton.png',180,60),
		size: {x: 180, y: 60},
		clicked: false,

		init: function (x,y) {
			
			this.addAnim('base', 1, [0]);
			this.currentAnim = this.anims.base;

			this.parent(x,y);

		},

		update: function () {

			if (ig.game.gamestate.roster && !ig.game.rosterFull) {
				this.kill();
			};

			if (ig.game.gamestate.play) {
				this.kill();
			}

			if (ig.input.pressed('lmb') && this.inFocus() && !ig.game.placing) {

				if (ig.game.gamestate.roster) {
					ig.game.gamestate.roster = false;
					ig.game.gamestate.placement = true;

					ig.game.gameInit();
					ig.game.rosterStorage.set('playerRoster', ig.game.playerroster);
					this.kill();
					return;
				};
				
				if (ig.game.gamestate.placement) {

					ig.game.playInit();

					this.kill();
					ig.game.infoPanel.kill();
					return;
				};
			};
			
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

