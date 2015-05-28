$( document ).ready(function() {
    function File(name) {this.name = name; this.url = "something";}
    describe("test UploaderFile ", function() {
        var file = new File("/home/uan4ik/Desktop/index.jpeg");
        var objID = "D5YiwzHhbL";
        var testUploader = new ParseUploader();
        it("hey", function() {});
        beforeEach(function () {
            ParseUploader.prototype.linkDataTo = jasmine.createSpy("uploadFile spy called successfully!");
            //testUploader.linkDataTo = jasmine.createSpy("uploadFile spy called successfully!");
            testUploader.uploadFile(file, objID, "Lost");
            //    var spyEvent = spyOn(testUploader, 'linkDataTo');
        });
        it("Uploader file function works fine", function() {
            //expect(testUploader.linkDataTo).toHaveBeenCalled();
            expect(ParseUploader.prototype.linkDataTo).toHaveBeenCalled();
        });
    });
});

