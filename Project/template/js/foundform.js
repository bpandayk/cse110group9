
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

// --------------------------------------------------
// upload item to db

FoundForm.prototype.upload = function() {
    console.log('entered FormManager.upload');
    this.uploader.upload(this.currItem,PARSEUPLOAD_CODE_FOUND);
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
    var foundForm = new FoundForm(uploader);
    $('#submit').click(function() {foundForm.callback()});
}

$(document).ready(main);
