$(document).ready(function() {

});


var createTable = function(data) {
        // Empty the table so it doesn't show old data
         $('#feed').empty();

        // JQuery for each loop
        $.each(data.results, function(index, value) {
           console.log(value);
           var $col = $('<div class="well well-lg">');

           $col.append('<p>' + index + '</p>');
           $col.append('<p>' + value.name + '</p>');
           $col.append('<p>' + value.item + '</p>');
           $col.append('<p>' + value.phone + '</p>');

           $('#feed').prepend($col);
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
