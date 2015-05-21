
/* This js file list all the lost and found post in the page. */

//
var ListManager = function(results) {
  this.results = results;
}

ListManager.prototype.drawList= function() {
  $('#feed').empty();
  $.each(this.results, function(index, value) {



     //var $col = $('<div class="well well-lg black-font" id = '+ value.id + '>');
     //$col.append('<table style = width:100%>');
     //$col.append('<tr>');

     var phto = value.get("myfile");

     var miniImg = new Image;
     miniImg.src = phto.url;
      var mol = '<div class="well well-lg black-font" id = '+ value.id + '>'+
                '<table style = width:100%>'+
                '<tr>'+
                '<td>'+
                '<img src="'+ miniImg.src +'" height="150" width="150"/>'+
                '</td>'+
                '<td> <p> Lost Item:' + value.get("item") + '</p>'+
                '<p class = "hide2" id = "' + value.id + 'details">' +
                "Description :" + value.get("descp") + '</p>'+ '</td>'+
                '</tr></table></div>';

       $('#feed').prepend(mol);


       /*
       $col.append('<td> <p id ="' + index + 'name">' + "Name:" + value.get("name") +'</p>');
       $col.append('<p>' + "Lost Item: " + value.get("item") + '</p>');
       $col.append('<p>' + "Lost Date: " + value.get("lostdate") + '</p>');
       $col.append('<p>' + "Last Location: " + value.get("loc") + '</p>');
       if(value.get("phone") != null)
         $col.append('<p>' + "Phone :" + value.get("phone") + '</p>');
       $col.append('<p class="hide1" id = "' + value.id + 'email">' + "Email :" + value.get("email") + '</p>');
       */
  });

  $.each(this.results, function(index, value) {
  //  console.log(value.id);
  $("#" + value.id).click(function(){
    $('#element_to_pop_up').empty();
    var photo = value.get("myfile");
    var url = photo.url;

    var img = new Image;
    img.src = photo.url;
    img.width = 400;
    img.height = 400;
    //var $col = ("<p> Name:"+ photo.url()+"</p>");
    var col = ("<a class='b-close'>X<a/>");
    var sol = (img);
    console.log(col);
    $('#element_to_pop_up').append(col);
    $('#element_to_pop_up').append(sol);
    $('#element_to_pop_up').bPopup();


  });
 });
  console.log(this.results.length);
  //for(var i = 0; i<this.)
}


var drawFeed = function(value) {

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
var main = function(){
  if(location.pathname == "/pages/newLostPage.html") {
    var lost = new Downloader("Lost");
    var res = lost.download();
    //lost.onClickDownload('YmaJuHzo4Y');



  } else if(location.pathname == "/pages/newFoundPage.html") {
    var found = new Downloader("Found");
    found.download();
    //found.queryDownload("cell Phone");
  }
}

$(document).ready(main);


//});
