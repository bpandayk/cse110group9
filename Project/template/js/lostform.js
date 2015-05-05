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

        // input data validations
        if ( validate_name(y, 'Please enter your name!') == false ) {
        $('#lostname').focus();
        return false
        }

        if ( validate_email(n, 'Not a valid e-mail address!') == false ) {
        $('#lostemail').focus();
        return false
        }

        if ( validate_date(o, 'Please select a date!') == false ) {
            $('#lostdate').focus();
            return false
        }

        if ( validate_phone(x, 'Not a valid phone number!') == false ) {
            $('#phone').focus();
            return false
        }

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
                "url":"https://api.parse.com/1/classes/Lost",
                "data":data,
                "contentType":"application/json",
                "dataType":"json",
                "headers":headers,
                success:function(data) {
                    alert("Data Loaded Sucessfully");
                    document.location.href = '../pages/listall.html';
                }
        });
});

function validate_name(val,alerttxt) {
    if( val='' ) {
        alert(alerttxt);
        return false
    } else {
        return true
    }
}

function validate_email(val,alerttxt) {
    atpos = val.indexOf('@');
    dotpos = val.lastIndexOf('.');
    if( atpos<1 || dotpos-atpos<2 ) {
        alert(alerttxt);
        return false
    } else {
        return true
    }
}

function validate_date(val,alerttxt) {
    var reg = /\d\d\/\d\d\/\d\d\d\d/;
    if( !reg.test(val) ) {
        alert(alerttxt);
        return false
    } else {
        return true
    }
}

function validate_phone(val,alerttxt) {
    var reg = /(\d{3}[ -]?){2}\d{4}/;
    if( !reg.test(val) ) {
        alert(alerttxt);
        return false
    } else {
        return true
    }
}

