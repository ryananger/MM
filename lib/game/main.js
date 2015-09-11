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
	'game.entities.inputManager',

	'game.igStorage.impact-storage'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),

	Socket: 0,
	Lobby: 0,
	Chat: 0,

	username: 'User',
	UserList: [],

	init: function() {
		var self = this;

		self.InputManager = self.spawnEntity(EntityInputManager);
		self.SocketController = self.spawnEntity(EntitySocketController);

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
	}

	
});

ig.main( '#canvas', MyGame, 60, 1320, 720, 1 );

});
