//$( document ).ready(function(){
 // function File(name) {this.name = name; this.url = "something";}
describe("test DownloaderFile", function(){
    //var file = new File("/home/imws/Desktop/test.jpeg");
    var testDownloader = new ParseDownloader();
    var fil = new File([""], "filename");
    var falseID = "qwertyuiuio";
    var falsefile = {};
    falsefile.name = '';

    Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");
    var Lost = Parse.Object.extend("Lost");
    obj = new Lost();
    var objID = obj.id;
    var saveParseJson = jQuery.parseJSON;
    var saveLinkDataTo = ParseDownloader.prototype.linkDataTo;

   // it("call spy", function() []);
   // beforeEach(function(){
   //parseDownloader.prototype.linkDataTo = jasmine.createSpy("downloadFile spy 
called successfully.");
   //testDownloader.downloadFile(objID, "Lost");
   it("call jQuery.parseJSON", function(done){
        passed = true;
        jQuery.parseJSON = function(){done();}
        testDownloader.downloadFile(falsefile,falseID,"Lost");
        expect(passed).toBeTruthy();
    });

    it("call parsedownloader", function(done){
        passed = true;
        ParseDownloader.prototype.linkDataTo = function() {done();}
        testDownloader.downloadFile(file,objID,"Lost");
        expect(passed).toBeTruthy();
    });

    jQuery.parseJSON = saveParseJSON;
    parseUploader.prototype.linkDataTo = saveLinkDataTo;
});

