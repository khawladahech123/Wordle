var height = 6;
var width = 5;

var row = 0;
var col = 0;

var gameOver = false;
var wordList = ["cigar", "rebut", "sissy", "humph", "awake", "blush", "focal", "evade", "naval", "serve", "heath", "dwarf", "model", "karma", ]

var guessList = ["aahed", "aalii", "aargh", "aarti", "abaca", "abaci", "abacs", "abaft", "abaka", "abamp", "aband", "abash", "abask", "abaya",]

guessList=guessList.concat(wordList);
// var word = "SQUID";
var word = wordList[Math.floor(Math.random()*wordList.length)].toUpperCase();
console.log(word);


window.onload = function() {
  initialize();
}

function initialize() {
  // Create the game board
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
  }
}
  // create the key board
    let keyboard = [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L", " "],
      ["Enter", "Z", "X", "C", "V", "B", "N", "M", "⌫" ]
  ]
  for (let i = 0; i<keyboard.length;i++){
    let currRow = keyboard[i];
    let keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard-row");

    for (let j=0; j< currRow.length; j++){
      let keyTile = document.createElement("div");

      let key = currRow[j];
      keyTile.innerText = key ;
      if(key == "Enter"){
        keyTile.id = "Enter";

      }
      else if (key == "⌫") {
        keyTile.id = "Backspace";
    }
    else if ("A" <= key && key <= "Z") {
        keyTile.id = "Key" + key; // "Key" + "A";
    } 

    keyTile.addEventListener("click", processKey);

    if (key == "Enter") {
      keyTile.classList.add("enter-key-tile");
  } else {
      keyTile.classList.add("key-tile");
  }
  keyboardRow.appendChild(keyTile);
}
document.body.appendChild(keyboardRow);
}
 


  //listen for key Press
  document.addEventListener("keyup", (e) => {
    processInput(e);

  })
}
function processKey() {
  e = { "code" : this.id };
  processInput(e);
}

function processInput(e) {
  if (gameOver) return; 

  // alert(e.code);
  if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
          let currTile = document.getElementById(row.toString() + '-' + col.toString());
          if (currTile.innerText == "") {
              currTile.innerText = e.code[3];
              col += 1;
          }
      }
  }
  else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
          col -=1;
      }
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      currTile.innerText = "";
  }

  else if (e.code == "Enter") {
      update();
  }

  if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
  }
}

function update() {
  let guess = "";
  document.getElementById("answer").innerText = "";
  
  //starting up the guess word 
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;
    guess += letter;
}

guess = guess.toLowerCase(); //case sensitive
console.log(guess);

if (!guessList.includes(guess)) {
    document.getElementById("answer").innerText = "Not in word list";
    return;
}

  //start progressing game 
  let correct = 0;

    let letterCount = {}; 
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }

    console.log(letterCount);
  //first iteration ,check all the correct ones 
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;

    //Is it in the correct position?
    if (word[c] == letter) {
        currTile.classList.add("correct");

        let keyTile = document.getElementById("Key" + letter);
        keyTile.classList.remove("present");
        keyTile.classList.add("correct");

        correct += 1;
        letterCount[letter] -= 1; //deduct the letter count
    }

    if (correct == width) {
        gameOver = true;
    }
}

console.log(letterCount);
// go again and mark which ones are present but in wrong position
for (let c = 0; c < width; c++) {
  let currTile = document.getElementById(row.toString() + '-' + c.toString());
  let letter = currTile.innerText;


      // skip the letter if it has been marked correct
      if (!currTile.classList.contains("correct")) {
        //Is it in the word?         
        if (word.includes(letter) && letterCount[letter] > 0) {
            currTile.classList.add("present");
            
            let keyTile = document.getElementById("Key" + letter);
            if (!keyTile.classList.contains("correct")) {
                keyTile.classList.add("present");
            }
            letterCount[letter] -= 1;
        } // Not in the word or (was in word but letters all used up to avoid overcount)
        else {
            currTile.classList.add("absent");
            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.add("absent")
        }
    }
}

row += 1; //start new row
col = 0; //start at 0 for new row
}