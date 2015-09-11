ig.module(
	'game.entities.rosterChar4'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityRosterChar4 = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/roster_sprites.png', 50, 50),

		baseSheet: 0,
		wingSheet: new ig.AnimationSheet ('media/roster_sprites_wings.png', 72, 72),
		hatSheet: new ig.AnimationSheet ('media/roster_sprites_hat.png', 72, 72),

		size: {x: 60, y: 60},
		stats: {name: 0, type: 0, color: 0, item: 0, HP: 100, MP: 4, AP: 2, order: 0},
		gx: 0,
		gy: 0,
		rosternum: -1,
		direction: 0,
		clicked: false,
		selected: false,
		spawned: [],

		init: function (x,y,n) {
			this.baseSheet = this.animSheet;

			this.parent(x,y);

			var colorName = 0;

			this.stats.type = n;

			ig.game.itemUnit = this;

			switch(this.stats.color) {
				case 0:
					colorName = 'Blue';
					break;
				case 1:
					colorName = 'Red';
					break;
				case 2:
					colorName = 'Purple';
					break;
				case 3:
					colorName = 'Yellow';
					break;
				case 4:
					colorName = 'Green';
					break;
			};

			switch (this.stats.type) {
				case 0:
					this.stats.name = colorName + ' Hitter';
					this.stats.HP = 100;
					this.stats.MP = 4;
					break;
				case 1:
					this.stats.name = colorName + ' Healer';
					this.stats.HP = 90;
					this.stats.MP = 4;
					break;
				case 2:
					this.stats.name = colorName + ' Spitter';
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

			var q = this.stats.type,
				r = this.stats.color*3;

			switch (this.stats.item) {
				case 0:
					this.anims.down = new ig.Animation (this.baseSheet, 1, [q + r]);
					this.anims.selected_down = new ig.Animation (this.baseSheet, 1, [q+r+15]);
					this.offset.x = 0;
					this.offset.y = 0;
					break;
				case 1:
					this.anims.down = new ig.Animation (this.wingSheet, 1, [q + r]);
					this.anims.selected_down = new ig.Animation (this.wingSheet, 1, [q+r+15]);
					this.offset.x = 11;
					this.offset.y = 18;
					break;
				case 2:
					this.anims.down = new ig.Animation (this.hatSheet, 1, [q + r]);
					this.anims.selected_down = new ig.Animation (this.hatSheet, 1, [q+r+15]);
					this.offset.x = 11;
					this.offset.y = 18;
					break;
			}

			if (ig.input.pressed('lmb')) {

				if (this.inFocus()) {
					console.log(ig.game.playerroster)

					if (!this.selected) {

						for (i = 0; i < ig.game.entities.length; i++) {
			        		ig.game.entities[i].selected = false;
			        	}

						this.clicked = true;
			        	this.selected = true;

			        	ig.game.itemUnit = 0;
			        	ig.game.itemUnit = this;
			        	ig.game.activeUnit = this;
					};
				}
				else {
					var spotFocus = this.spotFocus();

					if (spotFocus = 0) {
						this.selected = false;
						this.clicked = false;	
					};					
				};
		    };

		    if (ig.input.pressed('rmb')) {

		    	if (this.inFocus()) {
		    		this.kill();
		    		ig.game.playerroster[this.rosternum] = 0;
		    	};
		    };

		    if (this.selected) {

		    	this.currentAnim = this.anims.selected_down;

		    	if (ig.input.pressed('lmb')) {

		    		var spotFocus = this.spotFocus();

		    		var n = spotFocus - 1;

		    		if (spotFocus != 0) {
		    			var roster = ig.game.playerroster;

			    		if (roster[n] == 0) {

			    			roster[this.rosternum] = 0;

			    			this.pos.x = 455 + (n*90);
			    			this.pos.y = 305;

		    				ig.game.playerroster[n] = this;

		    				this.rosternum = n;
			    		};		    	
		    		};			    			
		    	};
		    }
		    else {
		    	this.currentAnim = this.anims.down;
		    }

			this.parent();
		},

		spotFocus: function() {

			var mx = ig.input.mouse.x,
				my = ig.input.mouse.y;

			if ( mx >= 450 && mx < 510 && my >= 300 && my < 360 ) {
				return 1;
			}
			else if ( mx >= 540 && mx < 600 && my >= 300 && my < 360 ) {
				return 2;
			}
			else if ( mx >= 630 && mx < 690 && my >= 300 && my < 360 ) {
				return 3;
			}
			else if ( mx >= 720 && mx < 780 && my >= 300 && my < 360 ) {
				return 4;
			}
			else if ( mx >= 810 && mx < 870 && my >= 300 && my < 360 ) {
				return 5;
			}
			else {
				return 0;
			}
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