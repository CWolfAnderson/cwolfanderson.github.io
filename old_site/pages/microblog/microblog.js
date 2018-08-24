$(function() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDvVkvxkOIrKiSCbPGmFLAEDpwGSVH6OD8",
    authDomain: "tester-a7f5e.firebaseapp.com",
    databaseURL: "https://tester-a7f5e.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);
  
  //global reference to the important input
  var $post = $("textarea");
  
  //global reference to our database
  var database = firebase.database();
  
  //push posts to the server
  $("#post-btn").click(function(){
    var postInfo = {
      post: $post.val(),
      timestamp: new Date() + ""
    };
    alert();
    //push data to server
    //every push triggers a 'child_added' event
    database.ref("posts").push(postInfo);
    $post.empty();
  });
  
  //renders posts from the server
  database.ref("posts").on("child_added",function(snapshot){
    //.val() returns just the data from the snapshot
    $("#posts").prepend(`<p>${snapshot.val().post}</p>`);
    console.log(snapshot.val().post);
  });
  
});









