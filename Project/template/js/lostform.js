$(document).ready(function() {
  $("#submit").click(function() {
    var x= $("#phone").val();
    //if(x == null || (x.length <0 && x.length>10))
      alert("Invalid Phone Number" + x)
  });
});
