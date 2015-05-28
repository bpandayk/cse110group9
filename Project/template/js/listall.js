
/* This js file list all the lost and found post in the page. */

//
var ListManager = function(results) {
  this.results = results;
}

ListManager.prototype.drawList= function(tooMany, numberOfPages) 
{
  $('#feed').empty();
  $.each(this.results, function(index, value) {
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
    var col = ("<a class='b-close'>X<a/>");
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
                  'Contact Owner or Finder </tr>' +
                  '<tr class = "warning">'+
                  '<td><p> Contact Name </p></td> <td><p> ' + value.get("name") + '</p></td><td></td></tr>' +
                  '<tr class = "warning">'+
                  '<td><p> Contact Phone </p></td> <td><p>'  + value.get("phone") + '</p></td> <td>' +
                  '<p><a class="btn btn-primary btn-sm" id ='+'S'+value.id +' role="button">Send  SMS</a></p></td></tr>' +
                  '<tr class = "warning">'+
                  '<td><p> Contact Email </p></td> <td><p> ' + value.get("email") + '</p></td> <td>' +
                  '<p><a class="btn btn-primary btn-sm"  id =' +'E'+value.id +' role="button">Send Email</a></p></td></tr>'+
                  '</table></div>';

    $('#element_to_pop_up').append(col);
    $('#element_to_pop_up').append(sol);
    $('#element_to_pop_up').append(info);
    $('#element_to_pop_up').append(contact);
    $('#element_to_pop_up').bPopup();

    $("#E"+value.id).click(function(){

      $('#element_to_pop_up').empty();

      var Emailform =  '<div class = "panel panel-primary">'+
         '<div class="panel-heading">Email</div>'+
         '<div class="panel-body">'+
          '<div class="forms">'+
            '<form id = "emailform" >'+
              '<div class = "form-group">'+
                '<label for="lostform">Name</label>'+
                  '<input type="text" class="form-control" id="Sname" placeholder="First Last">'+
              '</div> <div class="form-group">' +
               '<label for="exampleInputEmail1">From: Email address</label>' +
               '<input type="email" class="form-control" id="SEmail" placeholder="Enter your contact email"></div>' +
             '<div class="form-group">'+
           '<label for="exampleInputEmail1">Subject</label>'+
               '<input type="text" class="form-control" id="subject" placeholder="Enter Subject">'+
             '</div> <div class="form-group">'+
               '<textarea class="form-control" placeholder="Email Body" id = "emailbody" rows="20"></textarea>'+
               '</div><div>'+
               '<button type="button" class="btn btn-primary" id="Esubmit">Send Email</button></div>'+
             '</div></div>  </form>';

             $('#element_to_pop_up').append(col);
             $('#element_to_pop_up').append(Emailform);


            $("#Esubmit").click(function(){
              sendEmail(value.get("email"),value.get("name"));
            });
          });



          $("#S"+value.id).click(function(){
            if(value.get("phone") == 0000000000){
              $('#element_to_pop_up').append("<p><font color='RED'> Sorry.Your"+
               " request could not be completed. Error- Phone Not Available</font></p>");
            }
            else {
              smsForm();
              $("#Esubmit").click(function(){
                sendSMS(value.get("phone"),value.get("name"));
              });
            }
          });
    }); // End of click
 }); // End of click
}






//-----------------------------------------------------------
var smsForm = function(){
  $('#element_to_pop_up').empty();
  var col = ("<a class='b-close'>X<a/>");
  var smsform = '<div class = "panel panel-primary">'+
     '<div class="panel-heading">SMS</div>'+
     '<div class="panel-body">'+
      '<div class="forms">'+
        '<form id = "smsform" >'+
          '<div class = "form-group">'+
            '<label for="lostform">Name</label>'+
              '<input type="text" class="form-control" id="Sname" placeholder="First Last">'+
          '</div> <div class="form-group">' +
           '<label for="exampleInputEmail1">From: Email address</label>' +
           '<input type="email" class="form-control" id="SEmail" placeholder="Enter your contact email"></div>' +
         '<div class="form-group">'+
         '<div class="form-group">'+
           '<textarea class="form-control" maxlength="160"   placeholder="MAX OF 160 CHARACTERS" id = "smsbody" rows="20">'+
           '</textarea>'+
           '</div><div>'+
           '<button type="button" class="btn btn-primary" id="Esubmit">Send SMS</button></div>'+
         '</div></div>  </form>';

         $('#element_to_pop_up').append(col);
         $('#element_to_pop_up').append(smsform);
}

//------------------------------------------------------------------------------
  var sendEmail = function(toEmail, name){
    //document.location.href = '../pages/newEmailForm.html';
    console.log("Sending Email");
      Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
            );
      var from1 = $("SEmail").val();
      var to1 = toEmail;
      var subject1 = "LOST&FOUND : " + $("#subject").val();
      var body1 = $("#emailbody").val();
      console.log(to1);

      Parse.Cloud.run('sendEmail', {to:to1,subject:subject1,text:body1},{
        success:function() {
        console.log("sent");
        $('#element_to_pop_up').append("<p>Email Sent Successfully to " +
         toEmail+"</p>");
        document.getElementById("emailform").reset();
        var bPopup = $('#element_to_pop_up').bPopup();
        bPopup.close();
        },
        error:function(error) {
        console.log("not sent");
        $('#element_to_pop_up').append("<p><font color= 'RED'>Error in sending Email. "+
        "</font></p>");
        document.getElementById("emailform").reset();
        }
    });

}

//______________________________________________________________________________
var sendSMS = function(toPhone, name) {
  Parse.initialize(
          "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
          "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
          );
  var phone1=toPhone;
  var message1= $("#smsbody").val();
console.log(message1);


  Parse.Cloud.run('sendSMS', {PhoneNumbers:phone1,Message:message1}, {
    success: function(result) {
      console.log(result);
      $('#element_to_pop_up').append("<p>SMS Sent Successfully to " +
       phone1+"</p>");
      document.getElementById("smsform").reset();

    },
    error: function(error) {
      $('#element_to_pop_up').append("<p><font color='RED'>Message not sent - " +
       phone1+"</font></p>");
      document.getElementById("smsform").reset();

    }
  });

}

//-----------------------------------------------------------
ListManager.prototype.sendEmail = function(emailAddress) {}


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
  query1.contains('LCname', keyword);

  var query2 = new Parse.Query(this.className);
  query2.contains('LCitem', keyword);

  var query3 = new Parse.Query(this.className);
  query3.contains('phone', keyword);

  var query4 = new Parse.Query(this.className);
  query4.contains('LCemail', keyword);

  var query5 = new Parse.Query(this.className);
  query5.contains('LCloc', keyword);

  var mainQuery = Parse.Query.or(query1,query2,query3,query4,query5);

  mainQuery.find({
    success: function(results){
      if(results.length > 0) {
      var list1 = new ListManager(results);
      list1.drawList(false, 1);
    } else if(results.length == 0) {
      $("#feed").empty();
      $('#feed').prepend('<div class="well well-lg black-font" >'+
      "<p>Your search - <font color = 'RED'>"+keyword+
      " </font> did not match any documents</p> <p>Try with another keyword</p>");
    }
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
var Validator = function(object){
  this.object = object;
}

//////////////////////////////////////////////////////////////
var Items = function(value) {
  this.value = value;
}

/////////////////////////////////////////////////////////////
var main = function(){
  if(location.pathname == "/pages/newLostPage.html") {
    var lost = new Downloader("Lost");
    var res = lost.download();
    $('#searchLost').bind('keypress', function(e){
      if(e.keyCode==13){
         $('#listLostSearch').trigger('click');
      }
    });

    $('#listLostSearch').click(function(){
      var keyword = $('#searchLost').val();
      if(keyword.length == 0){
        lost.download();
      } else {
      lost.queryDownload(keyword);
      }
    });
  } 

  else if(location.pathname == "/pages/newFoundPage.html") {
    var found = new Downloader("Found");
    found.download();

    $('#searchFound').bind('keypress', function(e){
      if(e.keyCode==13){
         $('#listFoundSearch').trigger('click');
      }
    });

    $('#listFoundSearch').click(function(){
      var keyword = $('#searchFound').val();
      console.log(keyword);
      if(keyword.length == 0){
        found.download();
      } else {
      found.queryDownload(keyword);
      }
    });

  }
} // End of main

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
