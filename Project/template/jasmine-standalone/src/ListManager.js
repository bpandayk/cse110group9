var createCertainTable = function(objects){
  // JQuery for each loop
  $.each(objects, function(index, value) {
     console.log(value);

     var $col = $('<div class="well well-lg black-font" id ="' + index + '" >');
     $col.append('<p id ="' + index + 'name">' + "Name:" + value.get("name") +'</p>');
     $col.append('<p>' + "Lost Item: " + value.get("item") + '</p>');
     $col.append('<p>' + "Lost Date: " + value.get("lostdate") + '</p>');
     $col.append('<p>' + "Last Location: " + value.get("loc") + '</p>');
     if(value.get("phone") != null)
       $col.append('<p>' + "Phone :" + value.get("phone") + '</p>');
     $col.append('<p class="hide1" id = "' + index + 'email">' + "Email :" + value.get("email") + '</p>');
     $col.append('<p class = "hide2" id = "' + index + 'details">' + "Description :" + value.get("descp") + '</p>');
     $col.append('</div> </div>');


       $('#feed').prepend($col);
     $(".hide1").hide();
     $(".hide2").hide();
  });

  $.each(objects, function(index) {
    $("#" + index).click(function(){
      $("#" + index + "details").show();
      $("#" + index + "email").show();
    });
  });
}
