var height = 6;
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;
var word = "SQUID";

window.onload = function() {
  initialize();
}

function initialize() {
  // Create the game board
  for (var r = 0; r < height; r++) {
    for (var c = 0; c < width; c++) {
      var tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }
}
