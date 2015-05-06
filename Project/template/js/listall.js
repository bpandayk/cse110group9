$(document).ready(function() {

});

var flag=true;
var createTable = function(data) {
        // Empty the table so it doesn't show old data
         $('#feed').empty();

        // JQuery for each loop
        $.each(data.results, function(index, value) {
           console.log(value);
           var $col = $('<div class="well well-lg" id ="' + index + '">');
           $col.append('<p id ="' + index + '">' + "Name:" + value.name +'</p>');
           $col.append('<p>' + "Lost Item: " + value.item + '</p>');
           $col.append('<p>' + "Lost Date: " + value.lostdate + '</p>');
           $col.append('<p>' + "Last Location: " + value.loc + '</p>');
           if(value.phone != null)
             $col.append('<p>' + "Phone :" + value.phone + '</p>');
           $col.append('<p class="hide1" id = "' + index + 'email">' + "Email :" + value.email + '</p>');
           $col.append('<p class = "hide2" id = "' + index + 'details">' + "Description :" + value.descp + '</p>');
           $col.append('</div> </div>');

          // $('#feed').addClass(ids);
           $('#feed').prepend($col);
           $(".hide1").hide();
           $(".hide2").hide();
           flag=false;
        });

        $.each(data.results, function(index) {
          $("#" + index).click(function(){
            $("#" + index + "details").toggle();
            $("#" + index + "email").toggle();
          });
        });

     }


     // mybtn
     $(function() {
        var headers = {
           "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
           "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
        };

        $.ajax({
           "type": "GET",
           "url": "https://api.parse.com/1/classes/Lost",
           "contentType": "application/json",
           "dataType": "json",
           "headers": headers,
           success: createTable
        });

     });









      /*$.ajax({
        type : "get",
        url : 'https://api.parse.com/1/classes/Lost',
        beforeSend : function(request){
          request.setRequestHeader("X-Parse-Application-Id",'NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc');
          request.setRequestHeader("X-Parse-REST-API-key",'RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y');
        }
        }).done(function(data){
          //console.log(data);
          $('#feedbox').append(JSON.stringify(data));
          var output="<ul>";
          var out = JSON.stringify(data);
          var obj = JSON.parse(out);
          for(var i in obj) {
            output+="<li>" + obj[i].item+", "+ obj[i].item + "</li>";
          }

           output+="<li>";
           $("#feedbox").append(output);
        });
  });
*/
