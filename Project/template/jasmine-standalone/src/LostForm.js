
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
    // if focus is REMOVED from a text input field, remove the notification of
    // invalidness until the next submission
    this.currItem.forEach(function(field) {
        field.obj.focusout(function() {field.obj.removeClass('notValid');});
    });
}
extend(LostForm,FormManager);

