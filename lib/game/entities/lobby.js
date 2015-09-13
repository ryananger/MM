	ig.module(
		'game.entities.lobby'
	)
	.requires(
		'impact.game',
		'impact.entity'
	)
	.defines(function(){
		EntityLobby = ig.Entity.extend({
			lobby_bg: new ig.Image ('media/tbs_lobby_bg.png'),
			lobby_img: new ig.Image ('media/lobby.png'),
			lobby_scrollbar: new ig.Image ('media/lobby_scrollbar.png'),
			lobby_select: new ig.Image ('media/lobby_select.png'),

			font: new ig.Font( 'media/font.png' ),

			size: {x: 600, y: 560},

			UserList: [],
			LobbySlots: [],
			numberSlots: 25,

			selectedSlot: -1,
			lobbyScrollPosition: 0,

			rosterOn: false,

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
					if (!self.rosterOn) {
						self.mouseClick(mx, my);
					};					
				};

				self.parent();
			},

			mouseClick: function (mx, my) {
				var self = this;

				if (self.mouseOnUserList(mx, my))
				{
					var slotFocus = self.slotFocus(mx, my);

					if (self.UserList[slotFocus] != undefined)
					{
						self.selectedSlot = slotFocus;
					}
					else
					{
						self.selectedSlot = undefined;
					};
				}
				else 
				{
					var maxScroll = self.UserList.length - self.numberSlots;

					var arrowCheck = self.mouseOnLobbyArrow(mx, my);

					switch (arrowCheck)
					{
						case 'up':
							if (self.lobbyScrollPosition > 0) 
							{
								self.lobbyScrollPosition--;
							};
							self.setUserList(self.UserList);							
							break;
						case 'down':
							if (self.lobbyScrollPosition < maxScroll) 
							{
								self.lobbyScrollPosition++;
							};
							self.setUserList(self.UserList);							
							break;
					};
				};
			},

			setUserList: function (UserList) {
				var self = this;

				self.UserList = UserList;
				self.LobbySlots = [];

				if (self.UserList.length > self.numberSlots)
				{
					var n = self.lobbyScrollPosition;

					for (i = n; i < n + self.numberSlots; i++)
					{
						self.LobbySlots.push(self.UserList[i]);
					}
				}
				else
				{
					self.LobbySlots = self.UserList;
				};
			},

			mouseOnLobbyArrow: function (mx, my) {
				var arrow = 0;

				if (mx >= 800 && mx <= 820) 
				{
					if (my >= 120 && my <= 135)
					{
						arrow = 'up';
					};

					if (my >= 605 && my <= 620)
					{
						arrow = 'down';
					};
				};
				
				return arrow;
			},

			mouseOnUserList: function (mx, my) {

				return (mx >= 240 && mx <= 800 && my >= 120 && my <= 620);
			},

			slotFocus: function (mx, my) {

				var x_in = false,
					y_on = -1;

				if (mx >= 240 && mx <= 820)
				{
					x_in = true;
				};

				if (my >= 120 && my <= 620 && x_in)
				{
					y_on = Math.floor((my - 120)/20);
				};

				return y_on;
			},

			draw: function () {
				var self = this;

				self.lobby_bg.draw(0,0);
				self.lobby_img.draw(self.pos.x, self.pos.y);

				if (self.selectedSlot != -1)
				{
					self.lobby_select.draw(240, 120 + (self.selectedSlot*20));
				};

				for (i = 0; i < self.LobbySlots.length; i++) 
				{
					var name = self.LobbySlots[i].username;

					self.font.draw(name, 245, 128 + (i*20));
				};
			}
		});
	});

