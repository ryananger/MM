ig.module(
	'game.entities.rosterItem'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityRosterItem = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/roster_items.png', 72, 72),
		size: {x: 60, y: 60},
		stats: {name: 0, type: 0, color: 0, HP: 100, MP: 4, AP: 2, order: 0},
		type: 0,
		gx: 0,
		gy: 0,
		rosternum: -1,
		direction: 0,
		clicked: false,
		selected: false,
		parentChar: 0,

		init: function (x,y,n) {

			this.type = n;		

			this.parent(x,y);

			this.addAnim('base', 1, [this.type - 1]);
			this.addAnim('selected_base', 1, [this.type - 1 + 5])

			this.currentAnim = this.anims.base;

		},

		update: function () {
			var mx = ig.input.mouse.x,
				my = ig.input.mouse.y;

			if (ig.input.pressed('lmb')) {

				if (this.inFocus()) {

					if (!this.selected) {

						for (i = 0; i < ig.game.entities.length; i++) {
			        		ig.game.entities[i].selected = false;
			        	}

			        	if (ig.game.itemUnit != 0) {
			        		ig.game.itemUnit.stats.item = this.type;
			        		ig.game.itemUnit.selected = true;
			        	}

						this.clicked = true;
			        	this.selected = true;
			        	return;
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

		    if (this.selected) {

		    	this.currentAnim = this.anims.selected_base;

		    	if (ig.input.pressed('lmb') && this.inFocus()) {

		    		this.selected = false;
		    		ig.game.itemUnit.stats.item = 0;
		    	};

		    }
		    else {
		    	this.currentAnim = this.anims.base;
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