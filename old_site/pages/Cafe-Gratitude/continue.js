$(document).ready(function(){
  
  $('#continue-btn').click(function(e) {
    
    e.preventDefault();
    
    let $form = $('#subscribe-form');
    
    $.ajax({
      type: "GET",
      url: $form.attr("action"),
      data: $form.serialize(),
      cache: false,
      dataType: "jsonp",
      jsonp: "c",
      contentType: "application/json; charset=utf-8",
      error: function(error){
        console.log('error');
        console.log(error);
      },
      success: function(data){
        console.log('success');
        console.log(data);
      }
    });
    
    setTimeout(function() {
      window.location = '$MERAKI:AUTH_AND_CONTINUE_URL$';
    }, 2000);
    
  });
  
});