window.onload = function() {
  
  document.getElementById("background-music").volume = 0.6;
  
  var fizz = 3;
  var buzz = 5;
  
  var body = document.querySelector("body");
  var menu = document.getElementById("menu");
  var playButton = document.getElementById("play-btn");
  var numBubbles = document.getElementById("num-bubbles");
  var bubblesPopped = document.getElementById("bubbles-popped");
  var bubblePopSound = document.getElementById("bubble-pop-sound");
  
  
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  
  var marioSpeed;
  var marioSpeedMultiplier = 4;  
  
  var interval;
  var i;
  var maxBubbles;
  
  playButton.onclick = function(){
    startGame();
  };
  
  numBubbles.onkeyup = function(e) {
    if (e.keyCode === 13) {
      startGame();      
    }
  };
  
  function startGame() {
    
    marioSpeed = parseInt(document.querySelector("input[name=difficulty]:checked").value);
    
    if (marioSpeed === 3) marioSpeedMultiplier = 6;
    else if (marioSpeed === 5) marioSpeedMultiplier = 4;
    else if (marioSpeed === 7) marioSpeedMultiplier = 3;
    
    menu.style.display = "none";    
    
    resetScoreBoard();
    i = 1;
    maxBubbles = document.getElementById("num-bubbles").value;
    
    // start the game
    interval = setInterval(getItem, 1000);        
  }
  
  function getItem() {
    if (i % (fizz * buzz) === 0) display("Fizz\nBuzz");
    else if (i % fizz === 0) display("Fizz");
    else if (i % buzz === 0) display("Buzz");
    else display(i);
    i += 1;
    if (i > maxBubbles) {
      clearInterval(interval);
      setTimeout(function() {
        menu.style.display = "block";
        numBubbles.focus();     
      }, 4000);
    }
  }
  
  function display(item) {
    
    // display bubbles in random locations on screen
    var randomX = Math.floor(Math.random() * (windowWidth - 100)) + 50;
    var randomY = Math.floor(Math.random() * (windowHeight - 400)) + 300;
    
    var bubble = document.createElement("div");
    
    bubble.textContent = item;
    bubble.style.position = "absolute";
    bubble.style.top = randomY + "px";
    bubble.style.left = randomX + "px";
    
    var classes = "bubble fade-in";
    
    // add separate classes for styling purposes
    if (item === "Fizz\nBuzz") {
      bubble.setAttribute("class", classes + " fizzbuzz");     
    } else if (typeof item === "number") {
      bubble.setAttribute("class", classes + " number");    
    } else {
      bubble.setAttribute("class", classes + " " + item.toLowerCase());
    }
    
    body.appendChild(bubble);
  }
  
  // handle arrow keys for Mario
  var mario = document.getElementById("mario");
  var map = [];
  var marioImgLeft = "img/mario_left.gif";
  var marioImgRight = "img/mario_right.gif";
  
  onkeydown = onkeyup = function(e){
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    
    var up = map[38];
    var down = map[40];
    var left = map[37];
    var right = map[39];
    
    if (up && right) {
      mario.style.top = (mario.offsetTop - (marioSpeed * marioSpeedMultiplier)) + "px";
      mario.style.left = (mario.offsetLeft + marioSpeed) + "px";
      mario.src = marioImgRight;
    } else if (down && right) {
      mario.style.top = (mario.offsetTop + marioSpeed) + "px";     
      mario.style.left = (mario.offsetLeft + marioSpeed) + "px";
      mario.src = marioImgRight;
    } else if (down && left) {
      mario.style.top = (mario.offsetTop + marioSpeed) + "px";     
      mario.style.left = (mario.offsetLeft - (marioSpeed * marioSpeedMultiplier)) + "px";
      mario.src = marioImgLeft;  
    } else if (up && left) {
      mario.style.top = (mario.offsetTop - (marioSpeed * marioSpeedMultiplier)) + "px";
      mario.style.left = (mario.offsetLeft - (marioSpeed * marioSpeedMultiplier)) + "px";
      mario.src = marioImgLeft;
    } else if (up) {
      mario.style.top = (mario.offsetTop - (marioSpeed * marioSpeedMultiplier)) + "px";
    } else if (down) {
      mario.style.top = (mario.offsetTop + marioSpeed) + "px";     
    } else if (left) {
      mario.style.left = (mario.offsetLeft - (marioSpeed * marioSpeedMultiplier)) + "px";
      mario.src = marioImgLeft;
    } else if (right) {
      mario.style.left = (mario.offsetLeft + marioSpeed) + "px";
      mario.src = marioImgRight;
    }
    
  };  
  
  var marioWidth = mario.width;
  var marioHeight = mario.height;
  
  var marioTop, marioBottom, marioLeft, marioRight;
  
  var bubbleWidth = 80;
  var bubbleHeight = 80;
  
  var bubbleTop, bubbleBottom, bubbleLeft, bubbleRight;
  
  var curTransform;
  
  // collisions for mario & bubbles
  var mlbr, mrbl, mtbb, mbbt;
  
  var scoreboard = document.getElementById("scoreboard");
  var score;
  var bubbles;
  var bubbleValue;
  
  setInterval(checkForCollision, 200);
  
  function checkForCollision() {
    marioLeft = mario.offsetLeft;
    marioTop = mario.offsetTop;
    
    bubbles = document.querySelectorAll(".bubble");
    
    bubbles.forEach(function(bubble) {
      
      // get real offsets
      curTransform = new WebKitCSSMatrix(window.getComputedStyle(bubble).webkitTransform);
      bubbleLeft = bubble.offsetLeft + curTransform.m41;
      bubbleTop = bubble.offsetTop + curTransform.m42;
      
      bubbleBottom = bubbleTop + bubbleHeight;
      bubbleRight = bubbleLeft + bubbleWidth;
      
      marioBottom = marioTop + marioHeight;
      marioRight = marioLeft + marioWidth;
      
      // calculate collisions for different positions
      mlbr = marioLeft < bubbleRight && marioRight > bubbleLeft;
      mrbl = marioRight > bubbleLeft && bubbleRight > marioLeft;
      mtbb = marioTop < bubbleBottom && marioBottom > bubbleTop;
      mbbt =  marioBottom > bubbleTop && bubbleBottom > marioTop;
      
      if (mlbr && mrbl && mtbb && mbbt) {
        bubblePopSound.play();
        
        bubble.style.display = "none";
        
        // add score to scoreboard
        bubblesPopped.innerHTML = bubble.innerText.replace(/\s+/g, '') + "<br>" + bubblesPopped.innerHTML;
        bubblesPopped.scrollTop = bubblesPopped.scrollHeight;
        
        score = document.getElementById("score");
        if (bubble.innerText === "Fizz\nBuzz") {
          bubbleValue = 5;
        } else if (bubble.innerText === "Fizz") {
          bubbleValue = 2;
        } else if (bubble.innerText === "Buzz") {
          bubbleValue = 3;
        } else {
          bubbleValue = 1;
        }
        score.textContent = parseInt(score.textContent) + bubbleValue; 
      }
      
    });
    
  }
  
  function resetScoreBoard() {
    document.getElementById("score").textContent = 0;
    document.getElementById("bubbles-popped").textContent = "";    
  }
  
};