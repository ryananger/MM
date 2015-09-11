ig.module(
	'game.entities.rosterChar1'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityRosterChar1 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/roster_sprites.png', 50, 50),
		size: {x: 60, y: 60},
		stats: {name: 0, type: 0, color: 0, item: 0, HP: 100, MP: 4, AP: 2},
		gx: 0,
		gy: 0,
		rosternum: 0,
		direction: 0,
		clicked: false,
		selected: false,
		spawn: [],

		init: function (x,y,n) {

			this.parent(x,y);

			var colorName = 0;

			this.stats.type = n;

			switch (this.stats.type) {
				case 0:
					this.stats.name = 'Hitter';
					this.stats.HP = 100;
					this.stats.MP = 4;
					break;
				case 1:
					this.stats.name = 'Healer';
					this.stats.HP = 90;
					this.stats.MP = 4;
					break;
				case 2:
					this.stats.name = 'Spitter';
					this.stats.HP = 100;
					this.stats.MP = 3;
					break;
			};

			var q = this.stats.type,
				r = this.stats.color*3;

			this.addAnim('down', 1, [q+r]);
			this.addAnim('selected_down', 1, [q+r+15]);

			this.currentAnim = this.anims.down;

		},

		update: function () {
			var mx = ig.input.mouse.x,
				my = ig.input.mouse.y;

			if (ig.input.pressed('lmb')) {

				if (this.inFocus()) {
					if (!this.selected) {
						this.clicked = true;
			        	this.selected = true;

			        	ig.game.activeUnit = this;

			        	console.log('Clicked', this.stats.name);

			        	for (i = 0; i < 5; i++) {
			        		var n = i + 1;

			        		if (ig.game.spawn[i] != undefined) {
			        			ig.game.spawn[i].kill();
			        		};

			        		ig.game.spawn[i] = ig.game.spawnEntity(EntityRosterChar2);

			        		ig.game.spawn[i].stats.color = n - 1;
							ig.game.spawn[i].init(660 - 125 + (i*50), 150, this.stats.type);
			        	}
					}
				}					
				else {
					this.selected = false;
					this.clicked = false;
				};
		    };

		    if (this.selected) {
		    	this.currentAnim = this.anims.selected_down;
		    }
		    else {
		    	this.currentAnim = this.anims.down;
		    }

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