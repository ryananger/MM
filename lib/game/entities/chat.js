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
		ChatDisplay: [],

		blinkerOn: false,
		entryOn: false,

		keyEntry: [],
		entryString: '',

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

			if (ig.input.pressed('lmb')) {
				self.mouseClick(mx, my);
			};

			if (ig.input.pressed('ENTER')) {
				self.enterChat();
			};
		},

		updateString: function (entryString) {
			var self = this;

			self.entryString = entryString;
		},

		enterChat: function () {
			var self = this;

			var username = ig.game.username;

			var entry = {name: username, text: self.entryString};
			
			ig.game.SocketController.sendChat(entry);
			
			self.entryString = '';
			ig.game.InputManager.emptyString();
		},

		pushChat: function(entry) {
			var self = this;

			self.ChatLog.push(entry);
			self.ChatDisplay.push(entry);
		},

		chatOff: function () {
			var self = this;

			self.blinkerOn = false;
			self.entryOn = false;
			self.entryString = '';
		},

		mouseClick: function (mx, my) {
			var self = this;

			if (self.mouseOnEntryBar(mx, my)) {
				if (!self.blinkerOn) {
					ig.game.Blinker = ig.game.spawnEntity(EntityBlinker, self.pos.x + 5, self.pos.y + 420 - 1);
					self.blinkerOn = true;
					self.entryOn = true;
				}
			}
			else 
			{
				self.chatOff();
			}
		},

		setUserList: function () {
			var self = this;

			self.UserList = ig.game.UserList;
		},

		mouseOnEntryBar: function (mx, my) {

			return (mx >= 850 && mx <= 1090 && my >= 620 && my <= 640);
		},

		draw: function () {
			var self = this;

			self.parent();

			self.drawChat();

			if (self.entryOn) {
				self.font.draw(self.entryString, 855, 628);		
			};
		},

		drawChat: function() {
			var self = this;
			
			var last = self.ChatDisplay.length,
				first = 0;

			if (last > 40) {
				first = last - 40;
			};

			for (i = first; i < last; i++) {
				var entry = self.ChatDisplay[i];

				if (entry.name == 'system') {
					self.font.draw(entry.text, 855, 620 - (last*10) + (i*10));
				}
				else {
					self.font.draw(entry.name + ': ' + entry.text, 855, 620 - (last*10) + (i*10));
				}
				
			}
		}
	});
});

