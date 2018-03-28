var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server, {pingTimeout: 30000});

users = []

app.use(express.static('public'))
app.get('/', function(req,res){
	res.status(200).send()
})


io.on('connection', function(socket){

	console.log("Connection request")

	socket.on('join', function(data){
		console.log(data);
		socket.join(data)
		users.push({id:socket.id, nickname:data })

			var sockets = []
			Object.keys(io.sockets.sockets).forEach(function(id) {
					for (var i = 0; i < users.length; i++) {
						if(users[i].id == id){
							sockets.push(users[i])
						}
					}
			})
			io.sockets.emit('users', sockets)
	})

	socket.on('send', function(data){
		io.sockets.to(data.receiver).emit('receiver', data)
	})

})

server.listen(8888, function(){
	console.log("Start Server");
})
