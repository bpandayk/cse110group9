
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
// LostForm

function LostForm(uploader) {
    if ( !( uploader && "isA" in uploader && uploader.isA(Uploader) ) )
        alert('LostForm has to have an Uploader!');
    this.uploader = uploader;

    this.currItem = new ItemSpec(
        $("#lostname"),
        $("#item"),
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
extend(LostForm,FormManager);

// --------------------------------------------------
// upload item to db

LostForm.prototype.upload = function() {
    console.log('entered FormManager.upload');
    this.uploader.upload(this.currItem,PARSEUPLOAD_CODE_LOST);
    console.log('left FormManager.upload');
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
});

// ==================================================
// main function

var main = function() {
    var uploader = new ParseUploader();
    var lostForm = new LostForm(uploader);
    $('#submit').click(function() {lostForm.callback()});
}

$(document).ready(main);
