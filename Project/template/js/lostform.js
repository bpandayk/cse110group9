
// ==================================================
// lib
//
// function used to extend obj
// meaning, objects with constructors (functions)
function extend(Child, Parent) {
    var p = Parent.prototype;
    var c = Child.prototype;
    for (var i in p) {
        c[i] = p[i];
    }
    c.superClass = p;
    c.isA = function(i) {
        var ancestor = c;
        while ("superClass" in ancestor) {
            ancestor = ancestor.superClass;
            if ( ancestor == i.prototype ) return true;
        }
        return false;
    }
}

// function used to extend var
// meaning, pure variables (var v = {}; )
function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    }
    return c;
}

// ==================================================

// ======================================================================
// interface Field

function Field() {}
Field.prototype.validate = function() {};

// --------------------------------------------------

// Name implements Field
function Name(value) { this.value = value; }
extend(Name,Field);
Name.prototype.validate = function() {
    if( this.value == '' ) {
        return false;
    } else {
        return true;
    }
}
// end of Name

// --------------------------------------------------

// ItemName implements Field
function ItemName(value) { this.value = value; }
extend(ItemName,Field);
ItemName.prototype.validate = function() {
    if( this.value == '' ) {
        return false;
    } else {
        return true;
    }
}
// end of ItemName

// --------------------------------------------------

// Email implements Field
function Email(value) { this.value = value; }
extend(Email,Field);
Email.prototype.validate = function() {
    atpos =  this.value.indexOf('@');
    dotpos = this.value.lastIndexOf('.');
    if( atpos<1 || dotpos-atpos<2 ) {
        return false;
    } else {
        return true;
    }
}
// end of Email

// --------------------------------------------------

// ReportDate implements Field
function ReportDate(value) { this.value = value; }
extend(ReportDate,Field);
ReportDate.prototype.validate = function() {
    var reg = /\d\d\/\d\d\/\d\d\d\d/;
    if( !reg.test(this.value) ) {
        return false;
    } else {
        return true;
    }
}
// end of ReportDate

// --------------------------------------------------

// Phone implements Field
function Phone(value) { this.value = value; }
extend(Phone,Field);
Phone.prototype.validate = function() {
    var reg = /(\d{3}[ -]?){2}\d{4}/;
    if( !reg.test(this.value) ) {
        return false;
    } else {
        return true;
    }
}
// end of Phone

// --------------------------------------------------

// Location implements Field
function Location(value) { this.value = value; }
extend(Location,Field);
Location.prototype.validate = function() {
    return true;
}
// end of Location

// --------------------------------------------------

// Image implements Field
function Image(value) { this.value = value; }
extend(Description,Field);
Description.prototype.validate = function() {
    return true;
}
// end of Description

// --------------------------------------------------

// Description implements Field
function Description(value) { this.value = value; }
extend(Image,Field);
Image.prototype.validate = function() {
    return true;
}
// end of Image

// --------------------------------------------------

// ======================================================================
// ItemSpec

function ItemSpec(
        name, itemName, email, reportDate, phone, loc, img, description
        ) {
            this.reporter    = new Name(name);
            this.itemName    = new ItemName(itemName);
            this.email       = new Email(email);
            this.reportDate  = new ReportDate(reportDate);
            this.phone       = new Phone(phone);
            this.loc         = new Location(loc);
            this.img         = new Image(img);
            this.description = new Description(description);
}

// ----------------------------------------------------------------------

ItemSpec.prototype.validate = function() {
    var fieldsNotPass = [];
    // for each member of this
    for (var i in this) {
        // if member i is a Field
        if ( "isA" in this[i] && this[i].isA(Field) ) {
            // validate field i, if not pass, return false
            if ( !this[i].validate() ) { fieldsNotPass.push(this[i]; }
        }
    } // end of for
    return fieldsNotPass;
} // end of ItemSpec.validate()

// ----------------------------------------------------------------------

var item1 = new ItemSpec('jy','backpack');
item1.validate();

// ======================================================================
// DOMItemSpec

function DOMItemSpec(
        name, itemName, email, reportDate, phone, loc, img, description
        ) {
            this.reporter    = new Name(name.val());
            this.itemName    = new ItemName(itemName.val());
            this.email       = new Email(email.val());
            this.reportDate  = new ReportDate(reportDate.val());
            this.phone       = new Phone(phone.val());
            this.loc         = new Location(loc.val());
            this.img         = new Image(img.val());
            this.description = new Description(description.val());
}

// ======================================================================
// FormManager

function FormManager() {}
FormManager.prototype.drawForm = function(){};
FormManager.prototype.callback = function(){};
FormManager.prototype.upload   = function(){};

// ======================================================================
// FormManager

function LostForm() { var items = []; }
extend(LostForm,FormManager);
LostForm.prototype.callback = function(){
    var currItem = new DOMItemSpec(
        $("#lostname"),
        ($('#item').val() === "Other") ? 
            $("#othername") : $("#item"),
        $("#lostemail"),
        $("#lostdate"),
        $("#phone"),
        $("#lastloc")
        $("#itemdesc")
    );

    var fieldsNotPass = currItem.validate();
    if ( fieldsNotPass.length === 0 ) {
        // success
        this.upload();
    } else {
        // highlight fields
        // focus on first field failed
        fieldsNotPass.forEach(
            function(val,index,arr) {

            }
        );
    }

};
LostForm.prototype.upload   = function(){};

// **********************************************************************
// **********************************************************************
// **********************************************************************
// **********************************************************************

$(document).ready(function() {

});

//displays the calender and allows to pick a date
$(function()  {
    $("#lostdate").datepicker();
});


var objectID;

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

