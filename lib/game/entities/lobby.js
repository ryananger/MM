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

			init: function (x,y,Socket) {

				this.parent(x,y);

				var self = this;

				Socket.on('newUser', function (UserList,info)
				{
					self.UserList = UserList;
					self.setUserList();
				});

				Socket.on('userDisconnect', function (UserList, info) 
				{
					self.UserList = UserList;
					self.setUserList();
				});
			},

			update: function () {	

				var mx = ig.input.mouse.x,
					my = ig.input.mouse.y;

				if (ig.input.pressed('lmb'))
				{
					this.mouseClick(mx, my);
				};

				this.parent();
			},

			mouseClick: function (mx, my) {
				if (this.mouseOnUserList(mx, my))
				{
					var slotFocus = this.slotFocus(mx, my);

					if (this.UserList[slotFocus] != undefined)
					{
						this.selectedSlot = slotFocus;
					}
					else
					{
						this.selectedSlot = undefined;
					};
				}
				else 
				{
					var maxScroll = this.UserList.length - this.numberSlots;

					var arrowCheck = this.mouseOnLobbyArrow(mx, my);

					switch (arrowCheck)
					{
						case 'up':
							if (this.lobbyScrollPosition > 0) 
							{
								this.lobbyScrollPosition--;
							};
							this.setUserList();							
							break;
						case 'down':
							if (this.lobbyScrollPosition < maxScroll) 
							{
								this.lobbyScrollPosition++;
							};
							this.setUserList();							
							break;
					};
				};
			},

			setUserList: function () {

				//this.UserList = ig.game.UserList;
				this.LobbySlots = [];

				if (this.UserList.length > this.numberSlots)
				{
					var n = this.lobbyScrollPosition;

					for (i = n; i < n + this.numberSlots; i++)
					{
						this.LobbySlots.push(this.UserList[i]);
					}
				}
				else
				{
					this.LobbySlots = this.UserList;
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

				this.lobby_bg.draw(0,0);
				this.lobby_img.draw(this.pos.x, this.pos.y);

				if (this.selectedSlot != -1)
				{
					this.lobby_select.draw(240, 120 + (this.selectedSlot*20));
				};

				for (i = 0; i < this.LobbySlots.length; i++) 
				{
					var name = this.LobbySlots[i].username;

					this.font.draw(name, 245, 128 + (i*20));
				};
			}
		});
	});

