var interval = setInterval(changeBackgroundColor, 1000);
var isChangingColors = true;

function toggleInterval() {
  
  var toggleBtn = document.querySelector("#toggle-btn");
  
  if (isChangingColors) {
    clearInterval(interval);
    toggleBtn.textContent = "Start Changing Colors!";
    isChangingColors = false;
  } else {
    interval = setInterval(changeBackgroundColor, 1000);
    toggleBtn.textContent = "Stop Changing Colors!";
    isChangingColors = true;
  }
  
}

function updateTime() {
  
  // 1. get current time
  var d = new Date();
  
  // 2. grab time-div tag
  var timeDiv = document.querySelector("#time-div");
  
  // 3. add time to time-div
  timeDiv.textContent = d.toLocaleTimeString();
  
}

function changeBackgroundColor() {
  
  // 1. grab body tag
  var body = document.querySelector("body");
  console.log(body);
  
  // 2. get random color
  var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  console.log(randomColor);
  // 3. change body's background color to random color
  body.style.backgroundColor = randomColor;
  
  updateTime();
  
}