//global reference to the important input
var $textInput = $("textarea");
var $emailInput = $(".email");
var $passwordInput = $(".password");

//global reference to our database
var database = firebase.database();
//global reference to our authentication
var auth = firebase.auth();

//global reference to the bleet template
//requires underscore.js library
var bleetTemplateString = $(".bleet-template").html();
var bleetTemplate = _.template(bleetTemplateString);

$(".log-in-modal").modal({
  backdrop:"static",
  keyboard:false
});

$(".log-in").on("click",function(){
  //this function returns a Promise
  var signInPromise = auth.signInWithEmailAndPassword($emailInput.val(),$passwordInput.val());
  signInPromise.then(function(userData){
    //successfully log in!
    console.log("you logged in! here's your user data",userData)
    $(".log-in-modal").modal("hide");
  },function(error){
    //could not log in!
    console.log("could not log in!",error);

    //also returns a promise. hoo-boy.
    var createUserPromise = auth.createUserWithEmailAndPassword($emailInput.val(),$passwordInput.val());
    createUserPromise.then(function(userData){
      //successfully created user!
      console.log("user created",userData)
      $(".log-in-modal").modal("hide");
    },function(error){
      //could not create user
      console.log("could not create user",error)
    });
  });
})

//push bleets to the server
$(".send-bleet").on("click",function(){
  var bleetInfo = {
    email:auth.currentUser.email,
    bleet:$("textarea").val(),
    timestamp:new Date() + ""
  };

  //push data to server
  //every push triggers a 'child_added' event
  database.ref("bleets").push(bleetInfo);
  $textInput.val("");
});

//renders bleets from the server
database.ref("bleets").on("child_added",function(snapshot){
  //.val() returns just the data from the snapshot
  $(".bleet-feed").prepend(bleetTemplate(snapshot.val()));
});