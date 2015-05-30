$( document ).ready(function() {
   function File(name) {this.name = name; this.url = "something";}
describe("test UploaderFile ", function() {
  var file = new File("/home/uan4ik/Desktop/index.jpeg");
  var objID = "D5YiwzHhbL";
  var testUploader = new ParseUploader();
    testUploader.uploadFile(file, objID, "Lost");
  it("Uploader file function works fine", function() {
    testUploader.linkDataTo = jasmine.createSpy("uploadFile spy called successfully!");
//    var spyEvent = spyOn(testUploader, 'linkDataTo');
    expect(testUploader.linkDataTo).toHaveBeenCalled();
  });
  });
});

