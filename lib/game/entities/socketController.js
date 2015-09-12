ig.module(
    'game.entities.socketController'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
    EntitySocketController = ig.Entity.extend({
    	sessionid: 0,

        init: function () {
        	var self = this;
    		
			var Socket = io.connect("http://localhost:1337");

			ig.game.Socket = Socket;
			self.Socket = Socket;

			Socket.on('connect', function () {
				self.sessionid = Socket.io.engine.id;

				var username = ig.game.username,
					UserList = ig.game.UserList;

				Socket.emit('addUser', self.sessionid, username);

				ig.game.UserList.push({id: self.sessionid, username: username});
			});

			Socket.on('chatUpdate', function (entry) {
				ig.game.Chat.pushChat(entry);
			});

			Socket.on('updateName', function (sessionid, username) {
				if (self.sessionid == sessionid) {
					ig.game.username = username;
				};			
			});

			Socket.on('newUser', function (UserList, info) {
				ig.game.UserList = UserList;

				console.log(info.username + ' has connected!');
			});

			Socket.on('userDisconnect', function (UserList, info) {
				ig.game.UserList = UserList;

				console.log(info.username + ' has disconnected.');
			});
        },

        sendChat: function (entry) {
        	var self = this;

        	self.Socket.emit('chatUpdate', entry);
        }
    });
});

