	ig.module(
		'game.entities.roster'
	)
	.requires(
		'impact.game',
		'impact.entity'
	)
	.defines(function(){
		EntityRoster = ig.Entity.extend({
			roster: new ig.Image ('media/roster.png'),

			font: new ig.Font( 'media/font.png' ),

			size: {x: 600, y: 560},

			init: function (x,y,Socket) {
				var self = this;

				self.parent(x,y);
			},

			update: function () {
				var self = this;	

				var mx = ig.input.mouse.x,
					my = ig.input.mouse.y;

				if (ig.input.pressed('lmb'))
				{
					self.mouseClick(mx, my);			
				};

				self.parent();
			},

			mouseClick: function (mx, my) {
				var self = this;
			},

			draw: function () {
				var self = this;

				self.roster.draw(self.pos.x, self.pos.y);
			}
		});
	});

