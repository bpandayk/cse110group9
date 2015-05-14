$(document).ready(function() {
  document.getElementById("searchLost").value = "";
});
/* Problem 1
 prepends twice the same div if they keyword matches,
for example, name and item keys........ this if statement below
  "if ($('#' + index).length == 0) {  " lets this crap happen

Problem 2
Case insensetive but all the information is shown now with lowerCase which kind of sucks

Problem 3
DOES not find by date. SHould I keep the phone field as Number? (I changed it yo String...)
IF so why? Then have to figure out how to search by Number........

Problem 4
*/



/**
 * Takes care of the enter key function when entering the search word
 */
function enterPressed(e){
    if (!e) e = window.event;
    var pressedKey = e.keyCode || e.which;
    if (pressedKey == '13'){
      // pressed enter
      searchFunction();
      return false;
    }
  }

/**
 * Creates table of items specified by query's settings
 */
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


//////////////////////////////////    PRETTY SURE I Dont need createTable anymore..., image part is needed.
var searchText = "";
var newSearchText = "";
var createTable = function(data) {
  alert("called createTable");
  console.log(data);

        // Empty the table so it doesn't show old data
         $('#feed').empty();
        // JQuery for each loop
        $.each(data.results, function(index, value) {
           console.log(value);
           var $col = $('<div class="well well-lg black-font" id ="' + index + '" >');
           $col.append(  '<div class = "row">');
           $col.append(  '<div class = "col-sm-12">');
           $col.append(  '<div class = "row">');

           //$col.append("<a href="+value.myfile.url + 'class="thumbnail">');

           //$col.append("<img src="+ value.myfile.url+ " height='150' width='150'>");
           //$col.append("</a>");

           $col.append("<div class='col-sm-4'");
           $col.append('<p id ="' + index + 'name">' + "Name:" + value.name +'</p>');

           $col.append('<p>' + "Lost Item: " + value.item + '</p>');
           $col.append('<p>' + "Lost Date: " + value.lostdate + '</p>');
           $col.append('<p>' + "Last Location: " + value.loc + '</p>');
           if(value.phone != null)
             $col.append('<p>' + "Phone :" + value.phone + '</p>');
           $col.append('<p class="hide1" id = "' + index + 'email">' + "Email :" + value.email + '</p>');
           $col.append('<p class = "hide2" id = "' + index + 'details">' + "Description :" + value.descp + '</p>');


           $col.append('</div> </div></div></div></div></div>');

           $col.append('</div> </div>');
           $('#feed').prepend($col);
           console.log($col);

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

       /**
	* Search function, searches by keyword
	*/
       function searchFunction() {
	 if (typeof document.getElementById("searchLost").value == 'number')
		alert("I WAS RIGHT");
         newSearchText = searchText.concat(document.getElementById("searchLost").value).toLowerCase();
         Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
         "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs", "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt");

         $('#feed').empty();
         if (!newSearchText) {
           var query = new Parse.Query("Lost");
           query.limit(10);
           query.ascending("createdAt");
           query.contains("name", "");
           query.find({
              success: createCertainTable,
              error: function() {
                alert("error occurred when searching latest items");
              }
           });
         }
         else {
         // 2. Create a Parse Query for Post objects
         fieldArray = ["name", "item", "email", "phone", "loc", "descp"];
         for (var i = 0; i < fieldArray.length; i++) {
           var query = new Parse.Query("Lost");
           query.ascending("createdAt");
           query.contains(fieldArray[i], newSearchText);
           query.find({
              success: createCertainTable,
              error: function() {
                alert("error occurred when searching " + fieldArray[i]);
              }
           });
         }
         query = new Parse.Query("Lost");
         query.containedIn("lostDate", [newSearchText]);
         query.find({
            success: createCertainTable
          });
        }
     }

     /**
      * After Refresh Downloads 10 latest posted lost items
      */
     $(function() {
        Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs", "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt");

        $('#feed').empty();
          var query = new Parse.Query("Lost");

          query.limit(10);
          query.ascending("createdAt");
          query.contains("name", "");
          query.find({
             success: createCertainTable,
             error: function() {
               alert("error occurred when searching name");
             }
          });
     });
