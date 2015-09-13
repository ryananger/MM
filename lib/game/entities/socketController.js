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

			var setUserList = function (UserList) {
				ig.game.Chat.setUserList();
				ig.game.Lobby.setUserList(UserList);
			};

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

			Socket.on('nameChange', function (id, newname) {

				if (self.sessionid == id) {
					ig.game.username = newname;
				};

				for (var i in ig.game.UserList) {
					if (ig.game.UserList[i].id == id) {
						ig.game.UserList[i].username = newname;
						
						setUserList(ig.game.UserList);
					}
				};
			});

			Socket.on('newUser', function (UserList, info) {
				ig.game.UserList = UserList;

				var entry = {name: 'system', text: info.username + ' has connected!'};

				ig.game.Chat.pushChat(entry);
				setUserList(UserList);
			});

			Socket.on('userDisconnect', function (UserList, info) {
				ig.game.UserList = UserList;

				var entry = {name: 'system', text: info.username + ' has disconnected.'};

				ig.game.Chat.pushChat(entry);
				setUserList(UserList);
			});
        },

        sendChat: function (entry) {
        	//called in chat.js enterChat
        	var self = this;

        	self.Socket.emit('chatUpdate', self.sessionid, entry);
        }
    });
});

