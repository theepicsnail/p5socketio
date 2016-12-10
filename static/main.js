// Do the client side stuff
var server = io();
server.on('players update', function(update) { players = update; });
server.on('clientid', function(clientid) { myId = clientid; });
// Setup the UI
var W = 500;
var H = 500;
var myId = "";
var framesPerUpdate = 2;

var players = {};

function setup() { createCanvas(W, H); }

function draw() {
  background(200);
  stroke(0);
  fill(255);
  for (var id in players) {
    var p = players[id];
    if (id != myId)
      ellipse(p.x - 5, p.y - 5, 10, 10);
  }
  fill(0, 0, 255);
  ellipse(mouseX - 5, mouseY - 5, 10, 10);

  if (frameCount % framesPerUpdate == 0) {
    server.emit('mouse update', {x : mouseX, y : mouseY});
  }
}
