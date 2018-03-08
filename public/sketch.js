// Declar variable to keep track of our socket connection
var socket;

function setup() {
  createCanvas(600, 400);
  background(0);

function draw() {
  textSize(21);
  fill(0, 102, 153);
  text("Multiplayer Canvas App",0,20);
}

function mouseDragged() {
  // Draw some white circles
  fill(255,0,0);
  noStroke();
  ellipse(mouseX,mouseY,10,10);
  // Send the mouse coordinates
  sendmouse(mouseX,mouseY);

}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmousedata: " + xpos + " " + ypos);
  
  // Make a little object with  and y
  var data = {
    x: xpos,
    y: ypos
  };

  // Send that object to the socket
  socket.emit('mouse',data);
}
