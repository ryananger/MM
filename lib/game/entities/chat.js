ig.module(
	'game.entities.chat'
)
.requires(
	'impact.game',
	'impact.entity'
)
.defines(function(){
	EntityChat = ig.Entity.extend({
		animSheet: new ig.AnimationSheet ('media/chat.png',240,440),

		font: new ig.Font( 'media/font.png' ),

		size: {x: 240, y: 440},

		UserList: [],
		ChatLog: [],

		blinkerOn: false,
		entryOn: false,

		keyEntry: [],
		entryString: 'test',
		entryPosition: 0,

		Blinker: 0,

		init: function (x,y) {
			var self = this;

			self.parent();

			self.pos.x = x;
			self.pos.y = y;

			self.addAnim('base', 1, [0]);
			self.currentAnim = self.anims.base;

		},

		update: function () {
			var self = this;

			self.setUserList();	

			var mx = ig.input.mouse.x,
				my = ig.input.mouse.y;

			if (ig.input.pressed('lmb'))
			{
				self.mouseClick(mx, my);
			};
		},

		updateString: function (entryString, entryPosition) {
			var self = this;

			self.entryString = entryString;
			self.entryPosition = entryPosition;
		},

		mouseClick: function (mx, my) {

			if (this.mouseOnEntryBar(mx, my)) {
				if (!this.blinkerOn) {
					ig.game.Blinker = ig.game.spawnEntity(EntityBlinker, this.pos.x + 5, this.pos.y + 420 - 1);
					this.blinkerOn = true;
					this.entryOn = true;
				}
			}
			else 
			{
				this.blinkerOn = false;
				this.entryOn = false;
				this.entryString = '';
			}
		},

		setUserList: function () {

			this.UserList = ig.game.UserList;
		},

		mouseOnEntryBar: function (mx, my) {

			return (mx >= 850 && mx <= 1090 && my >= 620 && my <= 640);
		},

		draw: function () {

			this.parent();

			if (this.entryOn) {
				var n = this.font.widthForString(this.entryString);
				this.font.draw(this.entryString, 855, 628);		
			};
		}
	});
});

