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
	'game.entities.socketController',

	'game.igStorage.impact-storage'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),

	Socket: 0,
	Lobby: 0,
	Chat: 0,

	keyString: 0,

	username: 'User',
	UserList: [],

	init: function() {
		var self = this;

		self.bindKeys();

		self.SocketController = self.spawnEntity(EntitySocketController, 0, 0);

		self.Lobby = self.spawnEntity(EntityLobby, 230, 80, self.Socket);
		self.Chat = self.spawnEntity(EntityChat, 850, 200);
	},
	
	update: function() {
		var self = this;

		self.parent();
		
		var mx = ig.input.mouse.x,
			my = ig.input.mouse.y;

		var gx = Math.floor((mx - 160)/60),
			gy = Math.floor((my - 60)/60);

		if (ig.input.pressed('lmb')) 
		{
			console.log(Math.floor(mx),Math.floor(my));
		};
	},
	
	draw: function() {
		var self = this;

		var x = ig.system.width/2,
			y = ig.system.height/2;	

		self.parent();

	    self.font.draw('Entities: ' + self.entities.length, 10, 10);
	},

	bindKeys: function() {
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
	}
});

ig.main( '#canvas', MyGame, 60, 1320, 720, 1 );

});
