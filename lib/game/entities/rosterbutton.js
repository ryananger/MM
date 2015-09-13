ig.module(
	'game.entities.rosterbutton'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityRosterButton = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/rosterbutton.png',160,50),
		size: {x: 160, y: 50},
		clicked: false,

		rosterOn: false,

		init: function (x,y) {
			
			this.addAnim('base', 1, [0]);
			this.addAnim('selected', 1, [1]);
			this.currentAnim = this.anims.base;

			this.parent(x,y);

		},

		update: function () {
			var self = this;

			self.parent();

			if (self.rosterOn) {
				this.currentAnim = this.anims.selected;
			}
			else {
				this.currentAnim = this.anims.base;
			}

			if (self.inFocus()) {
				if (ig.input.released('lmb')) {
					if (!self.rosterOn) {
						ig.game.Roster = ig.game.spawnEntity(EntityRoster, 230, 80);
						ig.game.Lobby.rosterOn = true;
						self.rosterOn = true;
					}
					else if (self.rosterOn) {
						ig.game.Roster.kill();
						ig.game.Lobby.rosterOn = false;
						self.rosterOn = false;
					};
				};
				if (ig.input.released('rmb')) {
					
				};
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

