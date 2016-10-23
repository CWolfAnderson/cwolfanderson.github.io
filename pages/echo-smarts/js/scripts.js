$(function() {
  
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
  
  // get data from database & put it on the screen
  database.ref('facts').on('child_added', function(snapshot) {
    
    // console.log(snapshot);
    // console.log(snapshot.val());        
    
    console.log(snapshot.val());
    
    $('#facts').prepend(`
      <p>
      ${snapshot.val().timestamp}: <strong>${snapshot.val().fact}</strong>
      </p>
      `);
      
    });
    
    document.getElementById('add-shiz-btn').addEventListener('click', function() {
      
      database.ref('facts').push({
        fact: 'My shit bang.'
      });
      alert('Added');
    });
    
  });