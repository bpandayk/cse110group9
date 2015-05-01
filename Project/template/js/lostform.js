$(document).ready(function() {

});
  $("#submit").click(function() {
    console.log("Submit");
   var x= $("#phone").val();
   var y = $("#lostname").val();
   var m = $("#item").val();
   var n = $("#lostemail").val();
   var o = $("#lostdate").val();
   var p = $("#itemdesc").val();
   
   var headers = {
           "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
           "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
        };
    var userData = {"phone": Number(x),
    "name":String(y),
    "item":String(m),
    "email":String(n),
    "loc":String(o),
    "descp":String(p)};



    var data = JSON.stringify(userData);

    $.ajax({
      "type":"POST",
      "url":"https://api.parse.com/1/classes/Lost",
      "data":data,
      "contentType":"application/json",
      "dataType":"json",
      "headers":headers

    });
  });
