$(document).ready(function() {
  document.getElementById("searchLost").value = "";
});


function enterPressed(e){
    if (!e) e = window.event;
    var pressedKey = e.keyCode || e.which;
    if (pressedKey == '13'){
      // pressed enter
      searchFunction();
      return false;
    }
  }

/*
function foundMatch(text,value) {
  if (value.name.toLowerCase().indexOf(text) > -1 || value.item.toLowerCase().indexOf(text) > -1 ||
    value.loc.toLowerCase().indexOf(text) > -1 || value.lostdate.toLowerCase().indexOf(text) > -1 ||
    value.email.toLowerCase().indexOf(text) > -1 || value.descp.toLowerCase().indexOf(text) > -1 ||
    value.phone.indexOf(text) > -1 ) {
    return true;
  }
  else {
    return false;
  }
}
*/


var createCertainTable = function(objects, newSearchText){
  //alert("CREATED CERTAIN TABLE" );
  // JQuery for each loop
  $.each(objects, function(index, value) {
     console.log(value);

     //if ($('#' + index).length == 0) {
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
     //alert("GOES HERE");
     ////////////!!!!!!!!!!!1 prepends twice the same div if they keyword matches,
     /////////// !!!!!!! for example, name and item keys........ this if statement below
     //////////!!!!!!  "if ($('#' + index).length == 0) {  " lets this crap happen


       alert("prepends " + index);
       $('#feed').prepend($col);
    //}
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



var searchText = "";
var newSearchText = "";
var createTable = function(data) {
        // Empty the table so it doesn't show old data
         $('#feed').empty();
        // JQuery for each loop
        $.each(data.results, function(index, value) {
           console.log(value);
           var $col = $('<div class="well well-lg black-font" id ="' + index + '" >');
           $col.append('<p id ="' + index + 'name">' + "Name:" + value.name +'</p>');
           $col.append('<p>' + "Lost Item: " + value.item + '</p>');
           $col.append('<p>' + "Lost Date: " + value.lostdate + '</p>');
           $col.append('<p>' + "Last Location: " + value.loc + '</p>');
           if(value.phone != null)
             $col.append('<p>' + "Phone :" + value.phone + '</p>');
           $col.append('<p class="hide1" id = "' + index + 'email">' + "Email :" + value.email + '</p>');
           $col.append('<p class = "hide2" id = "' + index + 'details">' + "Description :" + value.descp + '</p>');
           $col.append('</div> </div>');
           $('#feed').prepend($col);
           $(".hide1").hide();
           $(".hide2").hide();
        });

        $.each(data.results, function(index) {
          $("#" + index).click(function(){
            $("#" + index + "details").show();
            $("#" + index + "email").show();
          });
        });

     }


       function searchFunction() {

         Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
         "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs", "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt");
         newSearchText = searchText.concat(document.getElementById("searchLost").value).toLowerCase();
         $('#feed').empty();


         /////////////!!!!!! returns only 100% matches, no substirng matching
         // 2. Create a Parse Query for Post objects
         var query = new Parse.Query("Lost");
         //alert("PRESSED SEARCH STEP 1" );
         query.containedIn("name", [newSearchText]);
         query.find({
            success: createCertainTable,
            error: function() {
              alert("error occurred when searching name");
            }
          });
         query = new Parse.Query("Lost");
         //alert("PRESSED SEARCH STEP 2" );
         query.containedIn("item", [newSearchText]);
         query.find({
           success: createCertainTable,
           error: function() {
             alert("error occurred when searching ITEM");
           }
          });
         query = new Parse.Query("Lost");
          //alert("PRESSED SEARCH STEP 3" );
         query.containedIn("email", [newSearchText]);
         query.find({
            success: createCertainTable,
            error: function() {
              alert("error occurred when searching EMAIL");
            }
          });
         query = new Parse.Query("Lost");
         query.containedIn("phone", [newSearchText]);
         query.find({
            success: createCertainTable
         });
         query = new Parse.Query("Lost");
         query.containedIn("loc", [newSearchText]);
         query.find({
            success: createCertainTable
          });
         query = new Parse.Query("Lost");
         query.containedIn("descp", [newSearchText]);
         query.find({
            success: createCertainTable,
            error: function() {
              alert("error occurred when searching EMAIL");
            }
          });
         query = new Parse.Query("Lost");
         query.containedIn("lostDate", [newSearchText]);
         query.find({
            success: createCertainTable
          });

////////////////!!!!!!! DOES not find by phone and date and description
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
