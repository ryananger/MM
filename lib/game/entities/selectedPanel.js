ig.module(
	'game.entities.selectedPanel'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntitySelectedPanel = ig.Entity.extend({
		sheet: new ig.Image ('media/roster_sprites.png'),
		font: new ig.Font( 'media/04b03.font.png' ),

		size: {x: 60, y: 60},
		stats: 0,

		init: function (x,y) {

			this.baseSheet = new ig.Image ('media/roster_sprites.png');
			this.wingSheet = new ig.Image ('media/roster_sprites_wings.png');
			this.hatSheet = new ig.Image ('media/roster_sprites_hat.png');

			this.parent(x,y);

		},

		update: function () {

			this.parent();

			if (ig.game.selectedUnit != 0) {
				this.stats = ig.game.selectedUnit;
			}
			else {
				this.stats = 0;
			};
		},

		draw: function () {
			this.parent();

			if (this.stats != 0) {
				var q = this.stats.type,
					r = this.stats.color*3;

				var z = 0,
					offx = 0,
					offy = 0;

				if (this.stats.item != 0) {
					z = 22;

					switch (this.stats.item) {
						case 1:
							this.sheet = this.wingSheet;
							offx = 11;
							offy = 18;
							break;
						case 2:
							this.sheet = this.hatSheet;
							offx = 11;
							offy = 18;
							break;
					}
				}
				else {
					this.sheet = this.baseSheet;
				}

		    	this.sheet.drawTile(1145 - offx, 5 - offy,q+r,50+z);

		    	this.font.draw(this.stats.name, 1205, 20);
		    	this.font.draw(this.stats.HP, 1205, 30);
		    	this.font.draw(this.stats.MP, 1205, 40);
			};				
		}
	});
});

