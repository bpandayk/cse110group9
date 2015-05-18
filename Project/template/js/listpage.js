/* This js file list all the lost and found post in the page. */

//
var ListManager = function(results) {
  this.results = results;
}

ListManager.prototype.drawList= function() {
  $.each(this.results, function(index, value) {
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
  console.log(this.results.length);
  //for(var i = 0; i<this.)
}


/////////////////////////////////////////////////

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

var lost = new Downloader("Lost");

var res = lost.download();
