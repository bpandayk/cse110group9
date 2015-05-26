
importScripts = [
    '../js/lib.js',
    '../js/ItemSpec.js',
    '../js/FormManager.js',
    '../js/Uploaders.js'
];
importScripts.forEach(function(val,index,arr) {
    $("head").append(
        '<script type="text/javascript" src="' + val + '"></script>'
    );
});

// ======================================================================
// FoundForm

function FoundForm(uploader) {
    if ( !( uploader && "isA" in uploader && uploader.isA(Uploader) ) )
        alert('FoundForm has to have an Uploader!');
    this.uploader = uploader;

    this.currItem = new ItemSpec(
        $("#lostname"),
        ($('#item').val() === "Other") ?
            $("#othername") : $("#item"),
        $("#lostemail"),
        $("#lostdate"),
        $("#phone"),
        $("#lastloc"),
        $("#img"),
        $("#itemdesc")
    );
    // if focus is REMOVED from a text input field, remove the notification of
    // invalidness until the next submission
    this.currItem.forEach(function(field) {
        field.obj.focusout(function() {field.obj.removeClass('notValid');});
    });
}
extend(FoundForm,FormManager);

// **************************************************

/*
$(document).ready(function() {

});

  //displays the calender and allows to pick a date
  $(function()  {
    $("#lostdate").datepicker();
  });
*/

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


  //post the data to parse app after submit is clicked
  $("#submit").click(function() {
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

   var headers = {
           "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
           "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
        };
    var userData = {"phone": Number(x),
    "name":String(y),
    "item":String(m),
    "email":String(n),
    "loc":String(q),
    "descp":String(p),
    "lostdate":Date(o)};



    var data = JSON.stringify(userData);

    $.ajax({
      "type":"POST",
      "url":"https://api.parse.com/1/classes/Found",
      "data":data,
      "contentType":"application/json",
      "dataType":"json",
      "headers":headers,
      success:function(data) {
        alert("Data Loaded Sucessfully");
        document.location.href = '../pages/listfound.html';
      }

    });
  });
