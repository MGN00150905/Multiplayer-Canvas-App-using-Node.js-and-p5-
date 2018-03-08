# Multiplayer-Canvas-App-using-Node.js-and-p5-

Computer Networks Project. Using socket.io so that clients can connect to the server and see what each individual client draws on the canvas.


As seen in the following code, I have created a function called sendmouse(). What this does is it sends the mouse co-ordinates to the socket which emits to the server. Notice I pass the x and y co-ordinates as a parameter in order to get the data.

```js
// Function for sending to the socket
function sendmouse(xpos, ypos) {

  console.log("sendmousedata: " + xpos + " " + ypos);
  

  var data = {
    x: xpos,
    y: ypos
  };


  socket.emit('mouse',data);
}
```

Now in the server.js file, this function says that if the client has draw something on the canvas, then grab the co-ordinates(data) from the client and send it to all other clients. the function we use to send this data to all other clients is socket.broadcast.emit.   

```js
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
```



