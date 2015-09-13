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
				if (self.entryString != '') {
					self.enterChat();
				};
			};
		},

		updateString: function (entryString) {
			// called in inputManager.js in keyAdd
			var self = this;

			self.entryString = entryString;
		},

		enterChat: function () {
			// called on ENTER press if entryString isn't empty
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
			self.chatWrap(entry);
		},

		chatWrap: function(entry) {
			// wraps chat entries for ChatDisplay
			var self = this;

			var fullString,
				newstring;

			// if system message, don't include username in string
			if (entry.name == 'system') {
				fullString = entry.text;
			}
			else {
				fullString = (entry.name + ': ' + entry.text);
			}

			// split string into array of words
			var words = fullString.split(' ');

			var line = '',
				lines = [];

			for (i = 0; i < words.length; i++) {
				var space = (i == 0) ? '' : ' ';

				var wordwidth = self.font.widthForString(words[i]);

				if (wordwidth > 200) {
					var truncatedWord = words[i].slice(0, 35);
					words[i] = truncatedWord;
				};

				// check width of line with added word
				var str = line + space + words[i];
				var width = self.font.widthForString(str);

				// if width is less than 230, add word to line
				// else push the line to array, and start a new line with current word. 
				if (width <= 230) {
					line = str;
				}
				else {
					lines.push(line);
					line = words[i];
				};
			};

			// pushes line from loop
			if (line != '') {
				lines.push(line);
			}

			// pushes lines into ChatDisplay
			for (i = 0; i < lines.length; i++) {
				self.ChatDisplay.push(lines[i]);
			}
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

			if (last > 41) {
				first = last - 41;
			};

			for (i = first; i < last; i++) {
				var entry = self.ChatDisplay[i];

				self.font.draw(entry, 855, 618 - (last*10) + (i*10));
			};
		}
	});
});

