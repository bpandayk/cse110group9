$(document).ready(function() {

});

//displays the calender and allows to pick a date
$(function()  {
    $("#lostdate").datepicker();
});



//function to hide and show the input box if item name is other than the listed
$(function(){
    //initially hide the textbox
    $("#othername").hide();
    $('#item').change(function() {
        if($(this).find('option:selected').val() == "Other"){
            $("#othername").show();
        }else{
            $("#othername").hide();
        }
    });
    $("#othername").keyup(function(ev){
        var othersOption = $('#item').find('option:selected');
        if(othersOption.val() == "Other"){
            ev.preventDefault();
            //change the selected drop down text
            $(othersOption).html($("#othername").val());
        }
    });
});


  var file;
  $('#img').bind('change', function(e){
    var files = e.target.files || e.dataTransfer.files;
    file = files[0];
    console.log(file.name);
  });

//post the data to parse app after submit is clicked
$("#submit").click(function() {
        Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs", "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt");
        var Lost = Parse.Object.extend("Lost");
        var myLost = new Lost();

        console.log("Submit");
        var x= $("#phone").val();
        var y = $("#lostname").val();
        var m = $("#item").val();
        if(m == "Other")
        m = $("#othername").val();

        var n = $("#lostemail").val();
        var o = $("#lostdate").val();
        var p = $("#itemdesc").val();
        var q = $("#lastloc").val();

        // input data validations
        if ( validate_name(y, 'Please enter your name!') == false ) {
        $('#lostname').focus();

        //return false;
        }

        if ( validate_email(n, 'Not a valid e-mail address!') == false ) {
        $('#lostemail').focus();
        //return false;
        }

        if ( validate_date(o, 'Please select a date!') == false ) {
            $('#lostdate').focus();
            //return false;
        }

        if ( validate_phone(x, 'Not a valid phone number!') == false ) {
            $('#phone').focus();
            //return false;
        }


        if(( validate_name(y, 'Please enter your name!') == false )||
        ( validate_email(n, 'Not a valid e-mail address!') == false )||
        ( validate_date(o, 'Please select a date!') == false )||
        ( validate_phone(x, 'Not a valid phone number!') == false ) ) {
          return false;
        }

        myLost.set("phone", String(x));
        myLost.set("name", String(y).toLowerCase());
        myLost.set("item", String(m).toLowerCase());
        myLost.set("email", String(n).toLowerCase());
        myLost.set("loc", String(q).toLowerCase());
        myLost.set("descp", String(p).toLowerCase());
        myLost.set("lostdate", Date(o).toLowerCase());
        myLost.save(null, {
        success: function(myLost) {
          alert("Data Loaded Sucessfully");
          var ID = myLost.id;
          uploadPhoto(ID);
          },
        error: function(myLost, error) {
          }
        });



    function uploadPhoto(id) {
        var serverUrl = 'https://api.parse.com/1/files/' + file.name;
        var headers = {
            "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
        };
        var objID = id;


            $.ajax({
               type: "POST",
               "headers": headers,
               url: serverUrl,
               data: file,
               processData: false,
               contentType: false,
               success: function(data) {
                 console.log(objID);
                 successUpload(data, objID);
               },
               error: function(data) {
                  var obj = jQuery.parseJSON(data);
                  console.error("Error: ");

               }
            });
          }
         });



         function successUpload(data, ObjID) {
          console.log(data);
          var obj = ObjID;
          console.log(obj);

          var headers = {
              "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
              "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
          };
          $('#uploadedLink').append(data.url);
          $.ajax({
            'type': "PUT",
            'headers': headers,
            'url': "https://api.parse.com/1/classes/Lost/"+obj,
            "contentType": "application/json",
            "dataType": "json",
            'success': function(data) {
               console.log("Success Add.");
            },
            'error': function(data) {
               console.log("Error Add.");
            },
              "data": JSON.stringify({
                 "myfile": {
                  "name": data.name,
                  "__type": "File"
                }
              })
           });
          };




function validate_name(val,alerttxt) {
    if( val=='' ) {
        //alert(alerttxt);
        return false
    } else {
        return true
    }
}

function validate_email(val,alerttxt) {
    atpos = val.indexOf('@');
    dotpos = val.lastIndexOf('.');
    if( atpos<1 || dotpos-atpos<2 ) {
        //alert(alerttxt);
        return false
    } else {
        return true
    }
}

function validate_date(val,alerttxt) {
    var reg = /\d\d\/\d\d\/\d\d\d\d/;
    if( !reg.test(val) ) {
        //alert(alerttxt);
        return false
    } else {
        return true
    }
}

function validate_phone(val,alerttxt) {
    var reg = /(\d{3}[ -]?){2}\d{4}/;
    if( !reg.test(val) ) {
        //alert(alerttxt);
        return false
    } else {
        return true
    }
}
