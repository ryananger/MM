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

		blinkerOn: false,
		entryOn: false,

		Blinker: 0,

		init: function (x,y) {

			this.parent();

			this.pos.x = x;
			this.pos.y = y;

			this.addAnim('base', 1, [0]);
			this.currentAnim = this.anims.base;

		},

		update: function () {

			this.setUserList();	

			var mx = ig.input.mouse.x,
				my = ig.input.mouse.y;

			if (ig.input.pressed('lmb'))
			{
				this.mouseClick(mx, my);
			};

			if (this.entryOn) {
				this.entryHandle();
			};

			this.parent();
		},

		entryHandle: function () {

			var n = event.keyCode;

			//console.log(event.keyCode)
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
		}
	});
});

