ig.module(
	'game.entities.infoPanel'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityInfoPanel = ig.Entity.extend({
		font: new ig.Font( 'media/font.png' ),
		animSheet: new ig.AnimationSheet ('media/infopanel.png',240,180),
		size: {x: 240, y: 180},

		init: function (x,y) {
			
			this.addAnim('base', 1, [0]);
			this.currentAnim = this.anims.base;

			this.parent(x,y);

		},

		update: function () {

			if (ig.input.pressed('lmb') && this.inFocus()) {
				this.kill();
			};
			
			this.parent();
		},

		draw: function() {
			this.parent();

			this.font.draw('Welcome to Monster Mayhem!', this.pos.x + 15, this.pos.y + 15);
			this.font.draw('This game is in early development but it will be', this.pos.x + 15, this.pos.y + 35);
			this.font.draw('playable soon.', this.pos.x + 15, this.pos.y + 45);

			if (ig.game.gamestate.placement) {

				this.font.draw('Click on characters to place them on the board.', this.pos.x + 15, this.pos.y + 75);
				this.font.draw('Use WASD to set facing direction.', this.pos.x + 15, this.pos.y + 85);

				this.font.draw('Click this panel to close it.', this.pos.x + 15, this.pos.y + 105);
			};

			if (ig.game.gamestate.roster) {

				this.font.draw('Build your roster by clicking on a unit and', this.pos.x + 15, this.pos.y + 75);
				this.font.draw('selecting a color. Click on an open slot to', this.pos.x + 15, this.pos.y + 85);
				this.font.draw('assign the selected unit to that roster slot.', this.pos.x + 15, this.pos.y + 95);
				this.font.draw('Right click on a unit to remove it.', this.pos.x + 15, this.pos.y + 105);

				this.font.draw('Unit turn order is set by roster position.', this.pos.x + 15, this.pos.y + 125);
				this.font.draw('When your roster is ready, press Start.', this.pos.x + 15, this.pos.y + 135);

				this.font.draw('Click this panel to close it.', this.pos.x + 15, this.pos.y + 155);

			};

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

