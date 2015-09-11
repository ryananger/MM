ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.character',
	'game.entities.arrows',
	'game.entities.startbutton',
	'game.entities.activePanel',
	'game.entities.selectedPanel',
	'game.entities.infoPanel',
	'game.entities.rosterChar1',
	'game.entities.rosterChar2',
	'game.entities.rosterChar4',
	'game.entities.rosterItem',
	'game.entities.lobby',
	'game.entities.chat',
	'game.entities.blinker',
	'game.entities.background',
	'game.igStorage.impact-storage'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	bg: new ig.Image( 'media/tbs_bg.png' ),
	roster_bg: new ig.Image( 'media/tbs_roster_bg.png' ),
	lobby_bg: new ig.Image( 'media/tbs_lobby_bg.png'),
	grid: [],

	playerroster: [],
	opponentroster: [],

	turnList: [],

	rosterFull: false,
	gamestate: {lobby: false, roster: false, placement: false, play: false, turn1: false, turn2: false},
	placing: false,
	numPlaced: 0,
	activeUnit: 0,
	selectedUnit: 0,
	spawn: [],
	spawnItem: 0,
	startButton: 0,

	turn: 0,

	itemUnit: 0,

	rosterChar: 0,

	Socket: 0,
	Lobby: 0,
	Chat: 0,
	Blinker: 0,

	keyString: 0,

	username: 'User',
	UserList: [],

	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.MOUSE1, 'lmb');
		ig.input.bind(ig.KEY.MOUSE2, 'rmb');

		ig.input.bind(ig.KEY.W, 'up');
		ig.input.bind(ig.KEY.D, 'right');
		ig.input.bind(ig.KEY.S, 'down');
		ig.input.bind(ig.KEY.A, 'left');

		ig.input.bind(ig.KEY.UP_ARROW, 'face_up');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'face_right');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'face_down');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'face_left');

		// ig.KEY is missing these keycodes.
        ig.KEY['TILDE'] = 192;
        ig.KEY['BACKSLASH'] = 220;
        ig.KEY['FORWARD_SLASH'] = 191;
        ig.KEY['SEMICOLON'] = 186; // XXX: Is 59 in FF.
        ig.KEY['APOSTROPHE'] = 222;
        ig.KEY['OPEN_BRACKET'] = 219;
        ig.KEY['CLOSE_BRACKET'] = 221;

        ig.input.bind(ig.KEY.TILDE, '`');
        ig.input.bind(ig.KEY.BACKSLASH, '\\');
        ig.input.bind(ig.KEY.FORWARD_SLASH, '/');
        ig.input.bind(ig.KEY.SEMICOLON, ';');
        ig.input.bind(ig.KEY.APOSTROPHE, "'");
        ig.input.bind(ig.KEY.OPEN_BRACKET, '[');
        ig.input.bind(ig.KEY.CLOSE_BRACKET, ']');

        ig.input.bind(ig.KEY.BACKSPACE, 'BACKSPACE');
        ig.input.bind(ig.KEY.TAB, 'TAB');
        ig.input.bind(ig.KEY.ENTER, 'ENTER');
        ig.input.bind(ig.KEY.PAUSE, 'PAUSE');
        ig.input.bind(ig.KEY.CAPS, 'CAPS');
        ig.input.bind(ig.KEY.ESC, 'ESC');
        ig.input.bind(ig.KEY.SPACE, ' ');
        ig.input.bind(ig.KEY.PAGE_UP, 'PAGE_UP');
        ig.input.bind(ig.KEY.PAGE_DOWN, 'PAGE_DOWN');
        ig.input.bind(ig.KEY.END, 'END');
        ig.input.bind(ig.KEY.HOME, 'HOME');
        ig.input.bind(ig.KEY.LEFT_ARROW, 'LEFT_ARROW');
        ig.input.bind(ig.KEY.UP_ARROW, 'UP_ARROW');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'RIGHT_ARROW');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'DOWN_ARROW');
        ig.input.bind(ig.KEY.INSERT, 'INSERT');
        ig.input.bind(ig.KEY.DELETE, 'DELETE');
        ig.input.bind(ig.KEY._0, '0');
        ig.input.bind(ig.KEY._1, '1');
        ig.input.bind(ig.KEY._2, '2');
        ig.input.bind(ig.KEY._3, '3');
        ig.input.bind(ig.KEY._4, '4');
        ig.input.bind(ig.KEY._5, '5');
        ig.input.bind(ig.KEY._6, '6');
        ig.input.bind(ig.KEY._7, '7');
        ig.input.bind(ig.KEY._8, '8');
        ig.input.bind(ig.KEY._9, '9');
        ig.input.bind(ig.KEY.A, 'A');
        ig.input.bind(ig.KEY.B, 'B');
        ig.input.bind(ig.KEY.C, 'C');
        ig.input.bind(ig.KEY.D, 'D');
        ig.input.bind(ig.KEY.E, 'E');
        ig.input.bind(ig.KEY.F, 'F');
        ig.input.bind(ig.KEY.G, 'G');
        ig.input.bind(ig.KEY.H, 'H');
        ig.input.bind(ig.KEY.I, 'I');
        ig.input.bind(ig.KEY.J, 'J');
        ig.input.bind(ig.KEY.K, 'K');
        ig.input.bind(ig.KEY.L, 'L');
        ig.input.bind(ig.KEY.M, 'M');
        ig.input.bind(ig.KEY.N, 'N');
        ig.input.bind(ig.KEY.O, 'O');
        ig.input.bind(ig.KEY.P, 'P');
        ig.input.bind(ig.KEY.Q, 'Q');
        ig.input.bind(ig.KEY.R, 'R');
        ig.input.bind(ig.KEY.S, 'S');
        ig.input.bind(ig.KEY.T, 'T');
        ig.input.bind(ig.KEY.U, 'U');
        ig.input.bind(ig.KEY.V, 'V');
        ig.input.bind(ig.KEY.W, 'W');
        ig.input.bind(ig.KEY.X, 'X');
        ig.input.bind(ig.KEY.Y, 'Y');
        ig.input.bind(ig.KEY.Z, 'Z');
        ig.input.bind(ig.KEY.NUMPAD_0, '0');
        ig.input.bind(ig.KEY.NUMPAD_1, '1');
        ig.input.bind(ig.KEY.NUMPAD_2, '2');
        ig.input.bind(ig.KEY.NUMPAD_3, '3');
        ig.input.bind(ig.KEY.NUMPAD_4, '4');
        ig.input.bind(ig.KEY.NUMPAD_5, '5');
        ig.input.bind(ig.KEY.NUMPAD_6, '6');
        ig.input.bind(ig.KEY.NUMPAD_7, '7');
        ig.input.bind(ig.KEY.NUMPAD_8, '8');
        ig.input.bind(ig.KEY.NUMPAD_9, '9');
        ig.input.bind(ig.KEY.MULTIPLY, '*');
        ig.input.bind(ig.KEY.ADD, '+');
        ig.input.bind(ig.KEY.SUBSTRACT, '-');
        ig.input.bind(ig.KEY.DECIMAL, '.');
        ig.input.bind(ig.KEY.DIVIDE, '/');
        ig.input.bind(ig.KEY.SHIFT, 'SHIFT');
        ig.input.bind(ig.KEY.CTRL, 'CTRL');
        ig.input.bind(ig.KEY.ALT, 'ALT');
        ig.input.bind(ig.KEY.PLUS, '=');
        ig.input.bind(ig.KEY.COMMA, ',');
        ig.input.bind(ig.KEY.MINUS, '-');
        ig.input.bind(ig.KEY.PERIOD, '.');

		this.socketController();

		this.Lobby = this.spawnEntity(EntityLobby, 230, 80, this.Socket);
		this.Chat = this.spawnEntity(EntityChat, 850, 200);
	},

	socketController: function() {
		// I intend to move this to its own file as an entity that will be created in this.init.

		var Socket = io.connect("http://localhost:1337");

		this.Socket = Socket;

		Socket.on('connect', function () 
		{
			var sessionid = Socket.io.engine.id;

			var username = ig.game.username,
				UserList = ig.game.UserList;

			Socket.emit('addUser', sessionid, username);

			ig.game.UserList.push({id: sessionid, username: username});
		});

		Socket.on('newUser', function (UserList, info)
		{
			ig.game.UserList = UserList;

			console.log(info.username + ' has connected!');
		});

		Socket.on('userDisconnect', function (UserList, info) 
		{
			ig.game.UserList = UserList;

			console.log(info.username + ' has disconnected.');
		});
	},

	rosterInit: function() {

		this.gamestate.roster = true;

		for (i = 0; i < 5; i++) 
		{
			this.playerroster[i] = 0;
		};	

		this.activePanel = this.spawnEntity(EntityActivePanel, 350, 400);
		this.infoPanel = this.spawnEntity(EntityInfoPanel, 240, 90);

		for (i = 0; i < 3; i++) 
		{
			this.rosterChar1 = this.spawnEntity(EntityRosterChar1);

			this.rosterChar1.stats.color = 0;
			this.rosterChar1.init(585 + (i*50), 75, i);
		};


		this.rosterStorage = new ig.Storage();

		// this.rosterStorage.clear();

		var z = this.rosterStorage.get('playerRoster');

		if (z != null) 
		{
			ig.game.playerroster = z;

			for (i = 0; i < ig.game.playerroster.length; i++) 
			{
				var spawn = ig.game.spawnEntity(EntityRosterChar4);

				spawn.rosternum = i;
				spawn.stats = ig.game.playerroster[i].stats;

				spawn.stats.color = ig.game.playerroster[i].stats.color;
				spawn.init(455 + (i*90), 305, ig.game.playerroster[i].stats.type);
			};
		};
	},

	gameInit: function() {

		for (i = 0; i < this.entities.length; i++) 
		{
			this.entities[i].kill();
		};

		this.activeUnit = 0;

		var x = ig.system.width/2,
			y = ig.system.height/2;

		this.activePanel = this.spawnEntity(EntityActivePanel, 65, 5);
		this.selectedPanel = this.spawnEntity(EntitySelectedPanel, 0,0);

		this.infoPanel = this.spawnEntity(EntityInfoPanel, x - 120, y - 90);

		//Create grid array
		for (x = 0; x < 20; x++) 
		{
			this.grid[x] = [];

			for (y = 0; y < 10; y++) 
			{
				this.grid[x][y] = 
				{
					posx: x,
					posy: y,
					state: 0
				};
			};
		};

		for (i = 0; i < this.playerroster.length; i++) 
		{
			var n = i + 1;

			this.playerroster[i] = this.spawnEntity(EntityCharacter, 65 + (i*60), 665, n);
		};
	},

	playInit: function() {

		this.gamestate.placement = false;
		this.gamestate.play = true;
		this.placing = false;

		var pr_length = this.playerroster.length,
			or_length = this.opponentroster.length;

		for (i = 0; i < pr_length; i++) 
		{
			this.turnList[i] = this.playerroster[i];
		}

		this.activeUnit = this.turnList[0];

		console.log(this.turnList)
	},
	
	update: function() {

		this.parent();
		
		var mx = ig.input.mouse.x,
			my = ig.input.mouse.y;

		var gx = Math.floor((mx - 160)/60),
			gy = Math.floor((my - 60)/60);

		if (ig.input.pressed('lmb')) 
		{
			console.log(Math.floor(mx),Math.floor(my));
		};

		if (ig.game.gamestate.roster) 
		{
			var n = 0;

			for (i = 0; i < this.playerroster.length; i++) 
			{
				if (this.playerroster[i] != 0) 
				{
					n++;
				};
			};

			if (n == 5 && !this.rosterFull) 
			{
				this.spawnEntity(EntityStart, 570, 0);
				this.rosterFull = true;
			}
			else 
			{
				this.rosterFull = false;
			}

			if (this.itemUnit != 0 && this.spawnItem == 0) 
			{
				this.spawnItem = [];

				for (i = 0; i < 2; i++) 
				{
					var n = i + 1;

					this.spawnItem[i] = this.spawnEntity(EntityRosterItem, 660 - 72 + (i*72), 215, n);
				};
			};
		};

		if (ig.game.gamestate.placement) 
		{
			if (this.numPlaced >= this.playerroster.length && this.startButton == 0) 
			{
				this.startButton = this.spawnEntity(EntityStart, 570, 0);
			};
		};

		if (ig.game.gamestate.play) 
		{
			this.turnList[0].selected = true;
		};
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		var x = ig.system.width/2,
			y = ig.system.height/2;	

		this.parent();

		// this.Lobby.draw();
		// this.Chat.draw();
		// this.Blinker.draw();

		//this.bg.draw(0,0);

		// if (this.gamestate.roster) 
		// {
		// 	this.roster_bg.draw(0,0);

		// 	for (i = 0; i < this.playerroster.length; i++) 
		// 	{
		// 		if (this.playerroster[i] != 0) 
		// 		{
		// 			this.font.draw(this.playerroster[i].stats.name, 650, 410 + (i*10));
		// 		};

		// 		this.font.draw('Slot ' + (i+1) + ':', 610, 410 + (i*10));
		// 	};
		// };

		// if (this.gamestate.lobby)
		// {
		// 	this.lobby_bg.draw(0,0);
		// 	this.Lobby.draw();
		// 	this.Chat.draw();

		// 	if (this.Blinker != 0)
		// 	{
		// 		this.Blinker.draw();
		// 	}
		// };

		// for (i = 0; i < this.entities.length; i++) 
		// {
	 //        this.entities[i].draw();
	 //    };

	    this.font.draw('Entities: ' + this.entities.length, 10, 10);

	    
	}
});



ig.main( '#canvas', MyGame, 60, 1320, 720, 1 );

});
