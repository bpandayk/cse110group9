
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
    var correct_phone_num_reg = /^\d{10}$/;
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
        if(files[0] == undefined) {
          console.log("img undefined");
        }
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
