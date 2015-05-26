
// ======================================================================
// FormManager

function FormManager() {}

// --------------------------------------------------
// upload item to db

FormManager.prototype.upload = function() {
    console.log('entered FormManager.upload');
    this.uploader.upload(this.currItem);
    console.log('left FormManager.upload');
};

// --------------------------------------------------
// what to do when some inputs are invalid?

FormManager.prototype.dealWithInvalidInput = function(fieldsNotPass) {
    console.log('entered FormManager.dealWithInvalidInput');
    // change focus onto first field failed
    fieldsNotPass[0].focus();
    // mark fields as not valid
    fieldsNotPass.forEach(
        function(val,index,arr) {
            val.addClass('notValid');
            console.log('field not valid: ',val);
        }
    );
    console.log('left FormManager.dealWithInvalidInput');
}

// --------------------------------------------------
// call back function of submit button

FormManager.prototype.callback = function() {
    console.log('entered FormManager.callback');

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
    console.log('left FormManager.callback');
};

