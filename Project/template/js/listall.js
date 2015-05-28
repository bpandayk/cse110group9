
/* This js file list all the lost and found post in the page. */

//
var ListManager = function(results) {
  this.results = results;
}

ListManager.prototype.drawList= function(tooMany, numberOfPages) {
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



  });
 /*
     for (var i = 0; i < numberOfPages; i++) {

          $('#feed').prepend('<button id= "page'+ i +'">''</button>');
      }
*/
  $.each(this.results, function(index, value) {
  //  console.log(value.id);
  $("#" + value.id).click(function(){
    $('#element_to_pop_up').empty();
    var photo = value.get("myfile");
    var url = photo.url;

    var img = new Image;
    img.src = photo.url;
    img.width = 600;
    img.height = 400;
    //var $col = ("<p> Name:"+ photo.url()+"</p>");
    var col = ("<a class='b-close'>x<a/>");
    var sol = (img);
    console.log(col);


    var info = '<div class = "iteminfo">'+
               '<p> </p>'+
               '<table class = "table table-hover">'+
               '<tr class = "info">'+
               '<td><p>Lost Item </p></td> <td><p> ' + value.get("item") +'</p></td></tr>' +
               '<tr class = "info"> '+
               '<td><p>Lost Date </p></td> <td><p> ' + value.get("lostdate") + '</p></td></tr>' +
               '<tr class = "info">'+
               '<td><p>Lost Location </p></td> <td><p> ' + value.get("loc") + '</p></td></tr>' +
               '<tr class = "info">'+
               '<td><p>Description  </p></td> <td><p> ' + value.get("descp") + '</p></td></tr>' ;
               '</table></div>';

   var contact = '<div class = "contact">'+
                  '<table class = "table table-hover">'+
                  '<tr class = "danger">'+
                  'Contact Owner or Founder </tr>' +
                  '<tr class = "warning">'+
                  '<td><p> Contact Name </p></td> <td><p> ' + value.get("name") + '</p></td></tr>' +
                  '<tr class = "warning">'+
                  '<td><p> Contact Phone </p></td> <td><p> ' + value.get("phone") + '</p></td></tr>' +
                  '<tr class = "warning">'+
                  '<td><p> Contact Email </p></td> <td><p> ' + value.get("email") + '</p></td></tr>' +
                  '</table></div>';

    $('#element_to_pop_up').append(col);
    $('#element_to_pop_up').append(sol);
    $('#element_to_pop_up').append(info);
    $('#element_to_pop_up').append(contact);
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
  var tooMany = false;
  var numberOfPages = 1;
  var query = new Parse.Query(this.className);

  //query.limit(10);
  query.find({
    success:function(results){
      var list = new ListManager(results);
      list.drawList(true, 1);
      }
  });
}



Downloader.prototype.queryDownload = function(keyword) {
  Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
  "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");

  //keyword = keyword.toLowerCase();

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
      list1.drawList(false, 1);
    }

  });

}


Downloader.prototype.downloadByDate = function(date) {
   Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
   "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");
   var query = new Parse.Query(this.className);
   query.greaterThanOrEqualTo("createdAt", date);
   query.find({
    success: function(results){
      var list1 = new ListManager(results);
      list1.drawList(false, 1);
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
var main = function(){
  if(location.pathname == "/pages/newLostPage.html") {
    var lost = new Downloader("Lost");
    var res = lost.download();
    $('#listLostSearch').click(function(){
      var keyword = $('#searchLost').val();
      if(keyword.length == 0){
        lost.download();
      } else {
      lost.queryDownload(keyword);
      }
    });




  } else if(location.pathname == "/pages/newFoundPage.html") {
    var found = new Downloader("Found");
    found.download();
    found.queryDownload();
  }
}

$(document).ready(main);

/*$(document).ready(function(){
  window["main"]();
  document.getElementById("searchLost").value = "";
  $('#searchByDate').datepicker({
    onSelect: function() {
    var lost = new Downloader("Lost");
    var date = $("#searchByDate").datepicker('getDate');
    lost.downloadByDate(date);
    }
  });
});*/
