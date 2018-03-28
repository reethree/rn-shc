// var socket = io.connect('http://192.168.1.107:8888/', {'forceNew':true})
var socket = io.connect('http://192.168.1.107:8888/')

socket.on('users', function(data){
	console.log(data)
})
