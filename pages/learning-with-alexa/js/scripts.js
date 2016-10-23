// Initialize Firebase
var config = {
  apiKey: "AIzaSyBYgd7-JPPqhAZT8udAC7BbcXqVXZ-nyJ8",
  authDomain: "echo-smarts.firebaseapp.com",
  databaseURL: "https://echo-smarts.firebaseio.com",
  storageBucket: "echo-smarts.appspot.com",
  messagingSenderId: "671614526969"
};
firebase.initializeApp(config);

// initialize database
let database = firebase.database();

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

let prevWins = 0;
let prevLosses = 0;

// get data from database & put it on the screen
database.ref('score').on('value', function(snapshot) {    
  
  let curWins = snapshot.val().wins;
  let curLosses = snapshot.val().losses;
  
  if (curWins === 1 && curLosses === 0
  || curWins === 0 && curLosses === 1
  || curWins === 0 && curLosses === 0) {
    prevWins = 0;
    prevLosses = 0;
  }
  
  $('#score-container').html(`
    <div id="score" class="text-center">
      <span id="wins">${curWins}</span> : <span id="losses">${curLosses}</span>
    </div>
  `);  
  
  let questionNumber = snapshot.val().wins + snapshot.val().losses + 1;
  
  $('#question-number').html(`
      Question ${questionNumber > 5 ? 5 : questionNumber}
  `);
  
  if (curWins > prevWins) {
    $('#score').animateCss('tada');
    prevWins = curWins;
  } else if (curLosses > prevLosses){
    $('#score').animateCss('shake');
    prevLosses = curLosses;
  }
  
});

database.ref('questions').on('child_added', function(snapshot) {      
    $('#question').html(snapshot.val().question).animateCss('bounceInUp');
});