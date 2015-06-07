
/* This js file list all the lost and found post in the page. */

//
var ListManager = function(results) {
  this.results = results;
}

ListManager.prototype.drawList= function(tooMany, numberOfPages)
{

  $.each(this.results, function(index, value) {
     var phto = value.get("myfile");
     var miniImg = new Image;
     if(phto == undefined) {
       miniImg.src = "../img/Noimage.png"
     } else {
       miniImg.src = phto.url;
     }

     var des = value.get("descp");

     var dt = value.createdAt;
     var Months = ["January", "February", "March",'April','May','June','July','August','September','October','November', 'December']
     dt = Months[dt.getMonth()] + " " + dt.getDay()  + ",  "+dt.getFullYear();

     var mol = '<div class="well well-lg black-font" id = '+ value.id + '>'+
                '<table style = width:100%>'+
                '<tr>'+
                '<td>'+
                '<img src="'+ miniImg.src +'" height="150" width="150"/>'+
                '</td>'+
                '<td> <p><strong> Posted on: </strong>' +dt +'</p>'+
                '<p> <strong>Item: </strong>' + value.get("item") + '</p>'+
                '<p class = "hide2" id = "' + value.id + 'details">' +
                "<p><strong>Description: </strong>" + des + '</p>'+ '</td>'+
                '</tr></table></div>';

       $('#feed').append(mol);

  });

  $.each(this.results, function(index, value) {
  //  console.log(value.id);
  $("#" + value.id).click(function(){
    $('#element_to_pop_up').empty();
    var photo = value.get("myfile");

    var img = new Image;
    if(photo == undefined) {
      img.src = "../img/Noimage.png"
    } else {
      img.src = photo.url;
    }
    img.width = 600;
    img.height = 400;
    var col = ("<a class='b-close'>X<a/>");
    var sol = (img);

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
                '<label for="lostform">Name<font color="RED">*</font></label>'+
                  '<input type="text" class="form-control" id="Sname" placeholder="First Last">'+
              '</div> <div class="form-group">' +
               '<label for="exampleInputEmail1">From: Email address<font color="RED">*</font></label>' +
               '<input type="email" class="form-control" id="SEmail" placeholder="Enter your contact email"></div>' +
             '<div class="form-group">'+
           '<label for="exampleInputEmail1">Subject<font color="RED">*</font></label>'+
               '<input type="text" class="form-control" id="subject" placeholder="Enter Subject">'+
             '</div> <div class="form-group">'+
               '<textarea class="form-control" placeholder="Email Body" id = "emailbody" rows="20"></textarea>'+
               '</div><div>'+
               '<button type="button" class="btn btn-primary" id="Esubmit">Send Email</button></div>'+
             '</div></div>  </form>';

             $('#element_to_pop_up').append(col);
             $('#element_to_pop_up').append(Emailform);


            $("#Esubmit").click(function(){

              var Ename = $('#Sname').val();
              var Eemail = $('#SEmail').val();
              var Esubject = $('#subject').val();
              var Ebody = $('#emailbody').val();
              var valiemail = new Validator();
              if(valiemail.validEmailform(Ename,Eemail,Esubject,Ebody))
                 sendEmail(value.get("email"),Ename,Eemail,Esubject, Ebody);
            });
          });


    /////////////////////////////////////////////////////
          $("#S"+value.id).click(function(){
            var phon = value.get("phone");
            if(phon == "Not Available"){
              $('#smss').empty();
              $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
               " request could not be completed. Error- Phone Not Available</font></p></div>");
            }else {
              smsForm();
              $("#Esubmit").click(function(){
                $('#smss').empty();
                var Sname = $("#Sname").val();
                var Sphone = $('#SEmail').val();
                var smsbody = $("#smsbody").val();
                console.log(smsbody);
                var validatesms = new Validator();
                if(validatesms.validSmsform(Sname, Sphone,smsbody))
                  sendSMS(value.get("phone"),Sname,Sphone,smsbody);
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
            '<label for="lostform">Name<font color="RED">*</font></label>'+
              '<input type="text" class="form-control" id="Sname" placeholder="First Last">'+
          '</div> <div class="form-group">' +
           '<label for="exampleInputEmail1">Phone Number<font color="RED">*</font></label>' +
           '<input type="tel" class="form-control" id="SEmail" placeholder="Enter your Phone Number" maxlength="10";></div>' +
         '<div class="form-group">'+
         '<div class="form-group">'+
           '<textarea class="form-control" maxlength="140"   placeholder="MAX OF 140 CHARACTERS" id = "smsbody" rows="20">'+
           '</textarea>'+
           '</div><div>'+
           '<button type="button" class="btn btn-primary" id="Esubmit">Send SMS</button></div>'+
         '</div></div>  </form>';

         $('#element_to_pop_up').append(col);
         $('#element_to_pop_up').append(smsform);
}

//------------------------------------------------------------------------------
  var sendEmail = function(toEmail, name,email,sub,body){
    //document.location.href = '../pages/newEmailForm.html';
    console.log("Sending Email");
      Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
            );
      var from1 = email;
      var to1 = toEmail;
      var subject1 = "LOST&FOUND : " + sub;
      var body1 = "From: " + name +
                   "Reply to: "+ email+
                   "     "+body;

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
var sendSMS = function(toPhone, name,frmPhone,msg) {
  Parse.initialize(
          "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
          "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
          );
  var phone1=toPhone;
  var message1= "From:"+frmPhone+ " - "+msg
  console.log(message1);


  Parse.Cloud.run('sendSMS', {PhoneNumbers:phone1,Message:message1}, {
    success: function(result) {
      console.log(result);
      $('#element_to_pop_up').append("<p>SMS Sent Successfully to " +
       phone1+"</p>");
      document.getElementById("smsform").reset();

    },
    error: function(error) {
      $('#smss').empty();
      $('#element_to_pop_up').append("<p><font color='RED'>Message not sent - " +
       phone1+"</font></p>");
      document.getElementById("smsform").reset();

    }
  });

}

//-----------------------------------------------------------
ListManager.prototype.sendEmail = function(emailAddress) {}


///////////////////////////////////////////////////////////////

var Downloader = function(className, counter, qcounter){
  this.className = className;
  this.counter = counter;
  this.qcounter = qcounter;
}

Downloader.prototype.download = function() {
  Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
  "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");
  var tooMany = false;
  var numberOfPages = 1;
  var query = new Parse.Query(this.className);
  var date = new Date("06-01-2015");

  query.descending("createdAt");
  query.skip(this.counter);
  query.limit(4);
  this.counter = this.counter+4;
  query.find({
    success:function(results){
      if(results.length > 0) {
        var list = new ListManager(results);
        list.drawList(true, 1);
      } else if (results.length == 0){
        $('#feed').append('<div class="well well-lg black-font" >'+
        "<p>NO MORE POST TO LOAD</p>");
         mainFeed = false;
        $(window).off('scroll');
      }
    }
  });
}



Downloader.prototype.queryDownload = function(keyword, date) {
  Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
  "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");

  //keyword = keyword.toLowerCase();
  if(date != '') {
    date = new Date(date);
    //date = date.toISOString();
  }

if(keyword!='' && date != '') {
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

  var query6 = new Parse.Query(this.className);
  query6.greaterThanOrEqualTo('createdAt', date)

  var mainQuery = Parse.Query.or(query1,query2,query3,query4,query5);
  mainQuery.greaterThanOrEqualTo('createdAt', date)

} else if (keyword!='' && date == '') {
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
} else if (keyword == '' && date!='') {
  var mainQuery = new Parse.Query(this.className);
  mainQuery.greaterThanOrEqualTo('createdAt', date);
}


  mainQuery.descending('createdAt');
  mainQuery.skip(this.qcounter);
  mainQuery.limit(5);
  this.qcounter = this.qcounter+5;

  mainQuery.find({
    success: function(results){
      if(results.length > 0) {
       var list1 = new ListManager(results);


      list1.drawList(false, 1);
    } else if(results.length == 0) {
      //$("#feed").empty();
      $(window).off('scroll');
      /*$('#feed').append('<div class="well well-lg black-font" >'+
      "<p>Your search - <font color = 'RED'>"+keyword+
      " </font> No matches</p> <p>Try with another keyword</p>");*/

    }
  }

  });

}


/////////////////////////////////////////////////////////////
var Validator = function(){
}

Validator.prototype.validPhone=function(Phone){
  var correct_phone_num_reg = /^\d{10}$/;
  var empty = Phone === '';
  if( !correct_phone_num_reg.test(Phone) && !empty ) {
      return false;
  } else {
      return true;
  }
}

Validator.prototype.validEmail=function(Email){
  atpos =  Email.indexOf('@');
  dotpos = Email.lastIndexOf('.');
  if( atpos<1 || dotpos-atpos<2 ) {
      return false;
  } else {
      return true;
  }
}


Validator.prototype.validSmsform = function(Name, Phone, Body){

   var phn = this.validPhone(Phone);
   console.log(phn)


  if(Name!='' && phn && Body == '') {
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Body of SMS empty</font></p></div>");
    return false;
  } else if (Name=='' && phn && Body != ''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Name field empty</font></p></div>");
     return false;
  } else if (Name!='' && !phn && Body != ''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Invalid Phone Number</font></p></div>");
     return false;
  } else if (Name=='' || !phn || Body == ''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- SMS Form Field Empty</font></p></div>");
     return false;
  } else {
    return true;
  }
}



Validator.prototype.validEmailform = function(Name, Email, Subject,Body){

   var eml = this.validEmail(Email);


  if(Name!='' && eml && Body == '' && Subject != '') {
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Body of Email empty</font></p></div>");
    return false;
  } else if (Name=='' && eml && Body != '' && Subject != ''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Name field empty</font></p></div>");
     return false;
  } else if (Name!='' && eml && Body != '' && Subject ==''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Subject Field Empty</font></p></div>");
     return false;
  }else if (Name!='' && !eml && Body != '' && Subject !=''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- Invalid Email Address/font></p></div>");
     return false;
  } else if (Name=='' || !eml || Body == '' || Subject == ''){
    $('#smss').empty();
    $('#element_to_pop_up').append("<div id='smss'><p><font color='RED'> Sorry.Your"+
     " request could not be completed. Error- SMS Form Field Empty</font></p></div>");
     return false;
  } else {
    return true;
  }
}





/////////////////////////////////////////////////////////////
var main = function(){
   $('.hideout').hide();
   $('#searchdate').datepicker({maxDate:new Date()});
   var m = $('#searchdate').val();
   console.log(m);
   var hide = true;
  var counter=0;
  var qCounter=0;
  var mainFeed = false;
  var queryFeed = false;
  var keyword;
  var date;

  if(location.pathname == "/pages/newLostPage.html") {
    var lost = new Downloader("Lost",counter, qCounter);
    var res = lost.download();
    mainFeed = true;

    $('#datesrch').click(function(){
      if(hide == true) {
        $('.hideout').show();
        hide = false;
      } else if(hide == false) {
        $('.hideout').hide();
        hide = true;
      }

    });



    $('#searchLost').bind('keypress', function(e){
      if(e.keyCode==13){
         $('#listLostSearch').trigger('click');
      }
    });

    $('#searchdate').bind('keypress', function(e){
      if(e.keyCode==13){
         $('#listLostSearch').trigger('click');
      }
    });

    $('#listLostSearch').click(function(){
      keyword = $('#searchLost').val();
      date = $('#searchdate').val();
      $(".hideout").hide();
      hide = true;
      console.log(date);
      if(keyword.length == 0 && date == ''){
        scrll();
        $('#feed').empty();
        lost = new Downloader("Lost",counter, qCounter);
        lost.download();
        mainFeed = true;
        queryFeed = false;
      } else {
        $('#feed').empty();
        scrll();
        lost = new Downloader("Lost",counter, qCounter);
       lost.queryDownload(keyword, date);

      queryFeed = true;
      mainFeed = false;
      }
    });

   var scrll = function(){
   $(window).on('scroll',function(){
       if($(document).height()==$(window).scrollTop()+$(window).height()){
           if(mainFeed==true) {
             lost.download();
             mainFeed=true;
             console.log(lost.counter);
           }

          if(queryFeed==true) {
            lost.queryDownload(keyword,date,dateto);
          }


       }


   });
}

scrll();

  } else if(location.pathname == "/pages/newFoundPage.html") {

    $('#datesrch').click(function(){
      if(hide == true) {
        $('.hideout').show();
        hide = false;
      } else if(hide == false) {
        $('.hideout').hide();
        hide = true;
      }

    });



    var found = new Downloader("Found",counter, qCounter);
    found.download();
    mainFeed = true;

    $('#searchFound').bind('keypress', function(e){
      if(e.keyCode==13){
         $('#listFoundSearch').trigger('click');
      }
    });

    $('#searchdate').bind('keypress', function(e){
      if(e.keyCode==13){
         $('#listFoundSearch').trigger('click');
      }
    });

    $('#listFoundSearch').click(function(){
      keyword = $('#searchFound').val();
      date = $('#searchdate').val();
      $(".hideout").hide();
      hide =true;
      console.log(date);
      if(keyword.length == 0 && date == ''){
        scrll();
        $('#feed').empty();
        found = new Downloader("Found",counter, qCounter);
        found.download();
        mainFeed = true;
        queryFeed = false;
      } else {
        $('#feed').empty();
        scrll();
        found = new Downloader("Found",counter, qCounter);
        found.queryDownload(keyword, date);
        console.log(keyword);
        console.log(date);

      queryFeed = true;
      mainFeed = false;
      }
    });

   var scrll = function(){
   $(window).on('scroll',function(){
       if($(document).height()==$(window).scrollTop()+$(window).height()){
           if(mainFeed==true) {
             found.download();
             console.log(found.counter);
           }

          if(queryFeed==true) {
            found.queryDownload(keyword, date, dateto);
            console.log(found.qCounter);
          }
       }
   });
}

scrll();


  }
} // End of main

$(document).ready(main);
