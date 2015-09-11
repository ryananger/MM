var server = require('http').createServer();

var io = require('socket.io')(server);

//var GameController = require('GameController.js')();

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
 			username = ('User ' + totalSocketCount);
 		};

 		var info = {id: sessionid, username: username};

  		Sockets.push(info);  	
  	
  		console.log(Sockets);

  		io.emit('newUser', Sockets, info);
  	});

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

	  	console.log(Sockets);
	});
});