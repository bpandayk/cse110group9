
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
Field.prototype.getValue = function() { return this.obj.val(); }

// --------------------------------------------------

// Name implements Field
function Name(obj) { this.obj = obj; }
extend(Name,Field);
Name.prototype.validate = function() {
    if( this.getValue() == '' ) {
        return false;
    } else {
        return true;
    }
}
// end of Name

// --------------------------------------------------

// ItemName implements Field
function ItemName(obj) { this.obj = obj; }
extend(ItemName,Field);
ItemName.prototype.validate = function() {
    if( this.getValue() == '' ) {
        return false;
    } else {
        return true;
    }
}
// end of ItemName

// --------------------------------------------------

// Email implements Field
function Email(obj) { this.obj = obj; }
extend(Email,Field);
Email.prototype.validate = function() {
    atpos =  this.getValue().indexOf('@');
    dotpos = this.getValue().lastIndexOf('.');
    if( atpos<1 || dotpos-atpos<2 ) {
        return false;
    } else {
        return true;
    }
}
// end of Email

// --------------------------------------------------

// ReportDate implements Field
function ReportDate(obj) {
    this.obj = obj;
    this.obj.datepicker(); // enable datepiker
}
extend(ReportDate,Field);
ReportDate.prototype.validate = function() {
    var reg = /\d\d\/\d\d\/\d\d\d\d/;
    if( !reg.test(this.getValue()) ) {
        return false;
    } else {
        return true;
    }
}
// end of ReportDate

// --------------------------------------------------

// Phone implements Field
function Phone(obj) { this.obj = obj; }
extend(Phone,Field);
Phone.prototype.validate = function() {
    var correct_phone_num_reg = /(\d{3}[ -]?){2}\d{4}/;
    var empty = this.getValue() === '';
    if( !correct_phone_num_reg.test(this.getValue()) && !empty ) {
        return false;
    } else {
        return true;
    }
}
// end of Phone

// --------------------------------------------------

// Location implements Field
function Location(obj) { this.obj = obj; }
extend(Location,Field);
Location.prototype.validate = function() {
    return true;
}
// end of Location

// --------------------------------------------------

// Description implements Field
function Description(obj) { this.obj = obj; }
extend(Description,Field);
Description.prototype.validate = function() {
    return true;
}
// end of Description

// --------------------------------------------------

// Image implements Field
function Image(obj) { 
    this.obj = obj; 
    //this.file = 'default_file';
    this.trackFile();
}
extend(Image,Field);
// re-define getValue func of Image
Image.prototype.getValue = function() { return this.file; }
Image.prototype.validate = function() { return true; }
Image.prototype.trackFile = function() {
    console.log('entered Image.trackFile');
    var img = this;
    img.obj.bind('change', function(e) {
        var files = e.target.files || e.dataTransfer.files;
        img.file = files[0];
        console.log('image file is',img.getValue());
    });
    console.log('left Image.trackFile');
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

ItemSpec.prototype.forEach = function(func) {
    if ( !(func && typeof(func) === "function") ) {
        console.log('ItemSpec.forEach needs a call back function');
        return;
    }
    // for each member of this
    for (var i in this) {
        // if member i is a Field
        if ( "isA" in this[i] && this[i].isA(Field) ) {
            func(this[i]);
        }
    }
}

// ----------------------------------------------------------------------

ItemSpec.prototype.validate = function() {
    var fieldsNotPass = [];
    this.forEach(function(field) {
        if ( !field.validate() ) { fieldsNotPass.push(field.obj); }
    });
    return fieldsNotPass;
} // end of ItemSpec.validate()

// ----------------------------------------------------------------------

// ======================================================================
// Uploader

function Uploader() {}
Uploader.prototype.upload = function(data){};

// ======================================================================
// ParseUploader

function ParseUploader() {}
extend(ParseUploader,Uploader);

// --------------------------------------------------
// upload

ParseUploader.prototype.upload = function(item){
    console.log('entered ParseUploader.upload...');

    // parameter has to be an ItemSpec
    if (!item || !item instanceof ItemSpec) return;
    console.log('input is an ItemSpec (great!)');

    console.log('initializing parse account...');
    Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs",
            "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt"
            );
    console.log('done');
    var Lost = Parse.Object.extend("Lost");
    var myLost = new Lost();

    // set data of myLost
    // notice image is NOT in the list and will be handled at uploading
    console.log('setting new Lost obj...');
    myLost.set("name",     String(item.reporter.getValue()).toLowerCase());
    myLost.set("item",     String(item.itemName.getValue()).toLowerCase());
    myLost.set("email",    String(item.email.getValue()).toLowerCase());
    myLost.set("lostdate", Date(item.reportDate.getValue()).toLowerCase());
    myLost.set("phone",    String(item.phone.getValue()));
    myLost.set("loc",      String(item.loc.getValue()).toLowerCase());
    myLost.set("descp",    String(item.description.getValue()).toLowerCase());
    console.log('done');

    // save myLost to parse
    console.log('uploading data to parse...');
    myLost.save(null, {
        success: function(myLost) {
            console.log('data saved sucessfully');
            console.log('start uploading photo');
            console.log('photo is', item.img.getValue() );
            ParseUploader.prototype.uploadFile(item.img.file,myLost.id);
            console.log('done');
        },
        error: function(myLost, error) {
            console.log('data did NOT save sucessfully');
            // TODO what to say / do?
            alert('Some error occured, please try later!');
        }
    });
    console.log('done');

    console.log('left ParseUploader.upload.');
};

// --------------------------------------------------
// upload file

ParseUploader.prototype.uploadFile = function(file,objID) {
    console.log('entered ParseUploader.uploadFile');

    // setups
    var serverUrl = 'https://api.parse.com/1/files/'+file.name;
    var headers = {
        "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
    };

    // uploading using AJAX
    $.ajax({
        type: "POST",
        "headers": headers,
        url: serverUrl,
        data: file,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log('successfully uploaded file '+file+' to '+objID);
            // link the newly added file to related parse obj
            ParseUploader.prototype.linkDataTo(data, objID);
        },
        error: function(data) {
            var obj = jQuery.parseJSON(data);
            console.error("Error: ");
        }
    });
}

// --------------------------------------------------
// link data (esp. files) to a parse obj.

ParseUploader.prototype.linkDataTo = function(data, objID) {
    console.log(data);
    console.log(objID);

    var headers = {
        "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
    };
    $('#uploadedLink').append(data.url);
    $.ajax({
        'type': "PUT",
        'headers': headers,
        'url': "https://api.parse.com/1/classes/Lost/"+objID,
        "contentType": "application/json",
        "dataType": "json",
        'success': function(data) {
            console.log("post uploaded successfully");
            // TODO what to do?
        },
        'error': function(data) {
            console.log("an error occured during post upload");
            // TODO what to do?
        },
        "data": JSON.stringify({
            "myfile": {
                "name": data.name,
        "__type": "File"
            }
        })
    });
};

// --------------------------------------------------

// ======================================================================
// FormManager

function FormManager() {}
FormManager.prototype.drawForm = function(){};
FormManager.prototype.callback = function(){};
FormManager.prototype.upload   = function(currItem){};

// ======================================================================
// FormManager

function LostForm(uploader) { 
    if ( !( uploader && "isA" in uploader && uploader.isA(Uploader) ) )
        alert('LostForm has to have an Uploader!');
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
}
extend(LostForm,FormManager);

// --------------------------------------------------
// upload item to db

LostForm.prototype.upload = function() {
    console.log('entered LostForm.upload');
    this.uploader.upload(this.currItem);
    console.log('left LostForm.upload');
};

// --------------------------------------------------
// what to do when some inputs are invalid?

LostForm.prototype.dealWithInvalidInput = function(fieldsNotPass) {
    console.log('entered LostForm.dealWithInvalidInput');
    // change focus onto first field failed
    fieldsNotPass[0].focus();
    // mark fields as not valid
    fieldsNotPass.forEach(
        function(val,index,arr) {
            val.addClass('notValid');
            console.log('field not valid: ',val);
        }
    );
    console.log('left LostForm.dealWithInvalidInput');
}

// --------------------------------------------------
// call back function of submit button

LostForm.prototype.callback = function() {
    console.log('entered LostForm.callback');

    // remove the not valid tag on all fields first
    this.currItem.forEach(function(field) {
        field.obj.removeClass('notValid');
    });

    var fieldsNotPass = this.currItem.validate();
    if ( fieldsNotPass.length === 0 ) {
        // success
        console.log('all inputs are valid! start uploading...');
        this.upload();
        console.log('done');
    } else {
        // oops, some info. was not correctly entered
        console.log('detected invalid input');
        this.dealWithInvalidInput(fieldsNotPass);
    }
    console.log('left LostForm.callback');
};

// function to hide and show the input box if item name is other than the listed
$(function() {
    //initially hide the textbox
    $("#othername").hide();
    $('#item').change(function() {
        if($(this).find('option:selected').val() == "Other"){
            $("#othername").show();
        } else {
            $("#othername").hide();
        }
    });
    /*
    $("#othername").keyup(function(ev){
        var othersOption = $('#item').find('option:selected');
        if(othersOption.val() == "Other"){
            ev.preventDefault();
            //change the selected drop down text
            $(othersOption).html($("#othername").val());
        }
    });
    */
});

// ==================================================
// main function

var main = function() {
    var uploader = new ParseUploader();
    var lostForm = new LostForm(uploader);
    $('#submit').click(function() {lostForm.callback()});
}

$(document).ready(main);

