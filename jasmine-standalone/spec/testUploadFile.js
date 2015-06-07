describe("test UploaderFile ", function() {
    var file = new File([""], "filename");
    var falsefile = {}; falsefile.name = '';
    var falseID = "!!!";
    var testUploader = new ParseUploader();

    Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
            );
    var Lost = Parse.Object.extend("Lost");
    obj = new Lost();
    var objID = obj.id;

    var saveParseJSON = jQuery.parseJSON;
    var saveLinkDataTo = ParseUploader.prototype.linkDataTo;

    it("should call jQuery.parseJSON", function(done) {
        passed = true;
        jQuery.parseJSON = function() { done(); }
        testUploader.uploadFile(falsefile, falseID, "Lost");
        expect(passed).toBeTruthy();
    });

    it("should call ParseUploader.prototype.linkDataTo", function(done) {
        passed = true;
        ParseUploader.prototype.linkDataTo = function() { done(); }
        testUploader.uploadFile(file, objID, "Lost");
        expect(passed).toBeTruthy();
    });

    jQuery.parseJSON = saveParseJSON;
    ParseUploader.prototype.linkDataTo = saveLinkDataTo;

});

