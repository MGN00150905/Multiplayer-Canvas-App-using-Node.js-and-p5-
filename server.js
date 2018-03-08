//Require express module from node modules
var express = require('express');
// Create the canvas app
var canvas = express();

//
var server = canvas.listen(3000);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example canvas listening at http://' + host + ':' + port);
}
//get all static files from public folder
canvas.use(express.static('public'));

//import socket io library user server as the argument
var io = require('socket.io')(server);

// Callback function that initiates for each client that connects
// This is run for each individual user that connects
io.sockets.on('connection',
  // Pass the socket object as a parameter
  function (socket) {
  
    console.log("We have a new artist: " + socket.id);
  
    // When the user emits data
    socket.on('mouse',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse co-ordinates' " + data.x + " " + data.y);
      
        // Sends mouse data to all other clients
        socket.broadcast.emit('mouse', data);

      }
    );
    
    socket.on('disconnect', function() {
      console.log("Artist has left :(");
    });
  }
);