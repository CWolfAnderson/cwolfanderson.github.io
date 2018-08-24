$(function() {
  
  $("#search-btn").click(function() {
    
    var city = $("#input-box").val();
    
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&appid=e42d32af9555a899db7106b67e9e5aae&units=imperial";
    
    $.ajax({
      url: url,
      success: function(data) {
        // $("#input-area").css("top", "400px");
        $("#city-name").text(data.name);
        $("#description").text("Description: " + data.weather[0].description);
        $("#temp").text("Temperature: " + data.main.temp + "°");
        
        var sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        var sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        
        $("#sun").text("Sunrise: " + sunrise + "\nSunset: " + sunset);
      }
    });
    
  });
  
  $.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      $(this).addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
      });
    }
  });
  
  $("#input-area").animateCss('bounce');
  
});