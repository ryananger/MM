var server = require('http').createServer();

var io = require('socket.io')(server);

var port = 1337;

var Sockets = [];

server.listen(port, function () 
{
  	console.log('Server listening at port: ', port);
});

var numberSockets = 0,
	totalSocketCount = 0;

io.on('connection', function (socket) 
{
  	numberSockets++;
  	totalSocketCount++;

  	socket.on('addUser', function (sessionid, username)
 	{
 		if (username == 'User') 
 		{
 			var newname = ('User ' + totalSocketCount);
 			socket.emit('updateName', sessionid, newname);
 		};

 		var info = {id: sessionid, username: newname};

  		Sockets.push(info);

  		io.emit('newUser', Sockets, info);
  	});

  	socket.on('chatUpdate', function (id, entry) {

  		var isFunction = function(entry) {
  			return entry.text.slice(0,1) == '/'; 
  		};

  		if (isFunction(entry)) {
  			var whatFunction = entry.text.slice(1,5);

  			switch (whatFunction) {
  				case 'nick':
  					nameChange(id, entry);
  					break;
  			}
  		}
  		else {
  			io.emit('chatUpdate', entry);
  		}
  		
  	});

  	var nameChange = function (id, entry) {
  		var newname = entry.text.slice(6);

  		for (var i in Sockets) {
  			if (Sockets[i].id == id) {
  				var oldname = Sockets[i].username;

  				Sockets[i].username = newname;

  				var systemEntry = {name: 'system', text: oldname + ' changed their username to ' + newname + '.'}

  				io.emit('chatUpdate', systemEntry);
  			}
  		}
  		io.emit('nameChange', id, newname);
  	};

  	socket.on('disconnect', function () 
  	{
	  	numberSockets--;

	  	for (i = 0; i < Sockets.length; i++)
	  	{
	  		if (Sockets[i].id == socket.id) 
	  		{
	  			var info = Sockets[i];

	  			Sockets.splice(i,1);

	  			io.emit('userDisconnect', Sockets, info);

	  			if (Sockets.length == 0) {
	  				totalSocketCount = 0;
	  			};
	  		};
	  	};
	});
});