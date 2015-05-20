/*$(document).ready(function() {
  document.getElementById("searchLost").value = "";
  document.getElementById("day").value = "1";
  document.getElementById("month").value = "Jan";
  document.getElementById("year").value = new Date().getFullYear();
  document.getElementById("checkDate").checked = false;
});
/*
Problem 1
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

////////////////////////
/*function enterPressed(e){
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
/*var createCertainTable = function(objects){
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
	/////////////////////////////////////////
       function searchFunction() {
         newSearchText = searchText.concat(document.getElementById("searchLost").value).toLowerCase();
	 var checked = false;
	 var requestedDate;
         Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
         "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs", "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt");
	 if (document.getElementById("checkDate").checked == true) {
	   monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jne", "Jly", "Aug", "Sep", "Oct", "Nov", "Dec"];
	   checked = true;
  	   var day = document.getElementById("day").value;
	   var month = monthArray.indexOf(document.getElementById("month").value);
	   var year = document.getElementById("year").value;
	   requestedDate = new Date(year, month, day);
	 }
         $('#feed').empty();
         if (!newSearchText) {
           var query = new Parse.Query("Lost");
           query.limit(10);
           query.descending("createdAt");
           query.contains("name", "");
	   if (checked) {
	     query.greaterThan("createdAt", requestedDate);
	   }
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
           query.descending("createdAt");
           query.contains(fieldArray[i], newSearchText);
	   if (checked) {
	     query.greaterThanOrEqualTo("createdAt", requestedDate);
	   }
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

	function pageLister() {

	}

     /**
      * After Refresh Downloads 10 latest posted lost items

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
*/
/////////////////////New code?//////////////



/* This js file list all the lost and found post in the page. */

//
var ListManager = function(results) {
  this.results = results;
}

ListManager.prototype.drawList= function() {
  $('#feed').empty();
  $.each(this.results, function(index, value) {


     var $col = $('<div class="well well-lg black-font" id = '+ value.id + '>');
     $col.append('<p id ="' + index + 'name">' + "Name:" + value.get("name") +'</p>');
     $col.append('<p>' + "Lost Item: " + value.get("item") + '</p>');
     $col.append('<p>' + "Lost Date: " + value.get("lostdate") + '</p>');
     $col.append('<p>' + "Last Location: " + value.get("loc") + '</p>');
     if(value.get("phone") != null)
       $col.append('<p>' + "Phone :" + value.get("phone") + '</p>');
     $col.append('<p class="hide1" id = "' + value.id + 'email">' + "Email :" + value.get("email") + '</p>');
     $col.append('<p class = "hide2" id = "' + value.id + 'details">' + "Description :" + value.get("descp") + '</p>');
     $col.append('</div> </div>');


       $('#feed').prepend($col);

  });

  $.each(this.results, function(index, value) {
    console.log(value.id);
  $("#" + value.id).click(function(){
     drawFeed(value.id);

  });
 });
  console.log(this.results.length);
  //for(var i = 0; i<this.)
}


var drawFeed = function(value) {
  $('#element_to_pop_up').empty();
  var $add = ("<p>"+value+"</p>");
  $('#element_to_pop_up').append($add);
  $('#element_to_pop_up').bPopup();

}

///////////////////////////////////////////////////////////////

var Downloader = function(className){
  this.className = className;
}

Downloader.prototype.download = function() {
  Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
  "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");

  var query = new Parse.Query(this.className);

  query.find({
    success:function(results){
      var list = new ListManager(results);
      list.drawList();

      }

  });
}



Downloader.prototype.queryDownload = function(keyword) {
  Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
  "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");

  keyword = keyword.toLowerCase();

  var query1 = new Parse.Query(this.className);
  query1.equalTo('LCname', keyword);

  var query2 = new Parse.Query(this.className);
  query2.equalTo('LCitem', keyword);

  var query3 = new Parse.Query(this.className);
  query3.equalTo('phone', keyword);

  var query4 = new Parse.Query(this.className);
  query4.equalTo('LCemail', keyword);

  var query5 = new Parse.Query(this.className);
  query5.equalTo('LCloc', keyword);

  var mainQuery = Parse.Query.or(query1,query2,query3,query4,query5);

  mainQuery.find({
    success: function(results){
      var list1 = new ListManager(results);
      list1.drawList();
    }

  });

}


/*onclick on individual fees, this method opens up the detail pop up window of
 *that specific post feed.
 */

Downloader.prototype.onClickDownload = function(objectID) {
  Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
  "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");

  var query = new Parse.Query(this.className);
  query.get(objectID, {
    success: function(results){
      var list1 = new ListManager(results);

    }
  });

}



/////////////////////////////////////////////////////////////
//$(document).ready(function() {

if(location.pathname == "/pages/newLostPage.html") {
  var lost = new Downloader("Lost");
  var res = lost.download();
  //lost.onClickDownload('YmaJuHzo4Y');



} else if(location.pathname == "/pages/newFoundPage.html") {
  var found = new Downloader("Found");
  found.download();
  //found.queryDownload("cell Phone");
}


//});
