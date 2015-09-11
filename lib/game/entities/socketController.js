ig.module(
    'game.entities.socketController'
)
.requires(
    'impact.game',
    'impact.entity'
)
.defines(function(){
    EntitySocketController = ig.Entity.extend({

        init: function (x,y) {
    		
			var Socket = io.connect("http://localhost:1337");

			ig.game.Socket = Socket;

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
        }
    });
});

