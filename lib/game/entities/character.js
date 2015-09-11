ig.module(
	'game.entities.character'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityCharacter = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/sprites1.png',50,50),
		size: {x: 60, y: 60},
		stats: {name: 0, type: 0, color: 0, item: 0, HP: 100, MP: 4, AP: 2},
		gx: 0,
		gy: 0,
		rosternum: 0,
		direction: 0,
		moving: false,
		aiming: false,
		facing: false,
		placing: false,
		clicked: false,
		selected: false,
		onBoard: false,
		arrows: 0,

		init: function (x,y,n) {
			n--;

			this.baseSheet = this.animSheet;

			this.wingSheet = new ig.AnimationSheet ('media/monsters_wing.png', 72, 72);
			this.hatSheet = new ig.AnimationSheet ('media/monsters_hat.png', 72, 72);

			this.parent(x,y);

			var roster = ig.game.playerroster;

			this.stats.color = roster[n].stats.color;
			this.stats.type = roster[n].stats.type;
			this.stats.item = roster[n].stats.item;

			var colorName = 0;

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
			}			

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

			}

			this.rosternum = n;			
			this.direction = 2;

			var q = this.stats.type*4,
				r = this.stats.color*12;

			this.addAnim('up', 1, [q+r+0]);
			this.addAnim('right', 1, [q+r+1]);
			this.addAnim('down', 1, [q+r+2]);
			this.addAnim('left', 1, [q+r+3]);

			this.addAnim('selected_up', 1, [q+r+60]);
			this.addAnim('selected_right', 1, [q+r+61]);
			this.addAnim('selected_down', 1, [q+r+62]);
			this.addAnim('selected_left', 1, [q+r+63]);

		},

		update: function () {

			var q = this.stats.type*4,
				r = this.stats.color*12;

			switch (this.stats.item) {
				case 0:
					this.anims.up = new ig.Animation (this.baseSheet, 1, [q + r + 0]);
					this.anims.right = new ig.Animation (this.baseSheet, 1, [q + r + 1]);
					this.anims.down = new ig.Animation (this.baseSheet, 1, [q + r + 2]);
					this.anims.left = new ig.Animation (this.baseSheet, 1, [q + r + 3]);
					this.anims.selected_up = new ig.Animation (this.baseSheet, 1, [q + r + 0 + 60]);
					this.anims.selected_right = new ig.Animation (this.baseSheet, 1, [q + r + 1 + 60]);
					this.anims.selected_down = new ig.Animation (this.baseSheet, 1, [q + r + 2 + 60]);
					this.anims.selected_left = new ig.Animation (this.baseSheet, 1, [q + r + 3 + 60]);
					this.offset.x = 0;
					this.offset.y = 0;
					break;
				case 1:
					this.anims.up = new ig.Animation (this.wingSheet, 1, [q + r + 0]);
					this.anims.right = new ig.Animation (this.wingSheet, 1, [q + r + 1]);
					this.anims.down = new ig.Animation (this.wingSheet, 1, [q + r + 2]);
					this.anims.left = new ig.Animation (this.wingSheet, 1, [q + r + 3]);
					this.anims.selected_up = new ig.Animation (this.wingSheet, 1, [q + r + 0 + 60]);
					this.anims.selected_right = new ig.Animation (this.wingSheet, 1, [q + r + 1 + 60]);
					this.anims.selected_down = new ig.Animation (this.wingSheet, 1, [q + r + 2 + 60]);
					this.anims.selected_left = new ig.Animation (this.wingSheet, 1, [q + r + 3 + 60]);
					this.offset.x = 11;
					this.offset.y = 18;
					break;
				case 2:
					this.anims.up = new ig.Animation (this.hatSheet, 1, [q + r + 0]);
					this.anims.right = new ig.Animation (this.hatSheet, 1, [q + r + 1]);
					this.anims.down = new ig.Animation (this.hatSheet, 1, [q + r + 2]);
					this.anims.left = new ig.Animation (this.hatSheet, 1, [q + r + 3]);
					this.anims.selected_up = new ig.Animation (this.hatSheet, 1, [q + r + 0 + 60]);
					this.anims.selected_right = new ig.Animation (this.hatSheet, 1, [q + r + 1 + 60]);
					this.anims.selected_down = new ig.Animation (this.hatSheet, 1, [q + r + 2 + 60]);
					this.anims.selected_left = new ig.Animation (this.hatSheet, 1, [q + r + 3 + 60]);
					this.offset.x = 11;
					this.offset.y = 18;
					break;
			}

			var mx = ig.input.mouse.x,
				my = ig.input.mouse.y;

			this.gx = Math.floor((this.pos.x - 60)/60);
			this.gy = Math.floor((this.pos.y - 60)/60);

			if (ig.input.pressed('lmb')) {

				//if infocus and not selected, set clicked, and select unit
				//otherwise, deselect, declick, deface, and kill arrows if there are any.

				if (this.inFocus()) {
					if (!this.selected && !ig.game.placing) {
						this.clicked = true;
			        	this.selected = true;

			        	if (!ig.game.gamestate.placement) {
			        		ig.game.selectedUnit = this.stats;
			        	}
			        	console.log('Clicked', this.stats.name);
					}
				}					
				else {

					if (ig.game.turnList[0] != this) {
						this.selected = false;
						this.clicked = false;
						this.facing = false;

						if (this.arrows != 0) {
							this.arrows.kill();
						};
					};						
				};
		    };

			if (ig.game.gamestate.placement) {
				
				var gridx = Math.floor((mx - 60)/60),
					gridy = Math.floor((my - 60)/60);

				//if I'm not placing, and unit was clicked, start placing and declick
				//if I'm placing, unit follows cursor.
				//On click, get grid coordinates from cursor position. If cursor is in starting grid, place character (placing = false), start facing, and spawn arrow entity.

				if (!this.placing && !ig.game.placing) {
					if (this.clicked) {
						ig.game.activeUnit = this;
						this.placing = true;
						this.clicked = false;
						ig.game.placing = true;

						if (this.onBoard) {
							ig.game.grid[gridx][gridy].state = 0;
						}
					}
				}
				else if (this.placing) {
					ig.game.activeUnit = this;
					this.pos.x = mx - 25;
					this.pos.y = my - 25;

					if (ig.input.pressed('lmb')) {

						if (gridx >= 0 && gridx < 4 && gridy >= 6 && gridy < 10) {
							if (ig.game.grid[gridx][gridy].state == 0) {
								this.pos.x = (gridx*60) + 65;
								this.pos.y = (gridy*60) + 65;

								ig.game.grid[gridx][gridy].state = 1;

								if (!this.onBoard) {
									ig.game.numPlaced++;
								}

								this.onBoard = true;
								
								this.placing = false;
								ig.game.placing = false;
								this.facing = true;
								this.arrows = ig.game.spawnEntity(EntityArrows, this.pos.x - 5, this.pos.y - 5);
								
								
								console.log ('Placed', this.stats.name, 'at ', gridx, ',', gridy);
							};								
						};
					};
				};
			};

			if (this.facing) {
				if (ig.input.pressed('up')) {
					this.direction = 0;
					this.facing = false;
					this.selected = false;
					this.arrows.kill();
					
					console.log(this.stats.name, 'faced up.');
				};
				if (ig.input.pressed('right')) {
					this.direction = 1;
					this.facing = false;
					this.selected = false;
					this.arrows.kill();

					console.log(this.stats.name, 'faced right.');
				};
				if (ig.input.pressed('down')) {
					this.direction = 2;
					this.facing = false;
					this.selected = false;
					this.arrows.kill();

					console.log(this.stats.name, 'faced down.');
				};
				if (ig.input.pressed('left')) {
					this.direction = 3;
					this.facing = false;
					this.selected = false;
					this.arrows.kill();

					console.log(this.stats.name, 'faced left.');
				};
			};
			
			switch (this.direction) {
				case 0:
					if (this.selected) {
						this.currentAnim = this.anims.selected_up;
					}
					else {
						this.currentAnim = this.anims.up;
					}
					break;
				case 1:
					if (this.selected) {
						this.currentAnim = this.anims.selected_right;
					}
					else {
						this.currentAnim = this.anims.right;
					}
					break;
				case 2:
					if (this.selected) {
						this.currentAnim = this.anims.selected_down;
					}
					else {
						this.currentAnim = this.anims.down;
					}
					break;
				case 3:
					if (this.selected) {
						this.currentAnim = this.anims.selected_left;
					}
					else {
						this.currentAnim = this.anims.left;
					}
					break;
			}

			if (this.HP <= 0) {
				this.kill();
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