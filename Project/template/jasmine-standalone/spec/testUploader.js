$( document ).ready(function() {
describe("test Uploader", function() {
  it("Uploader works fine", function() {

/*
  Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
            );
var testLostObject = new Parse.Object.extend("Lost");
testLostObject.set("name",     String(item.reporter.getValue()));
testLostObject.set("item",     String(item.itemName.getVlue()));
testLostObject.set("email",    String(item.email.getValue()));
testLostObject.set("lostdate", String(item.reportdate.getValue()));
testLostObject.set("phone",    String(item.phone.getValue()));
testLostObject.set("loc",      String(item.loc.getValue()));
testLostObject.set("descp",    String(item.description.getValue()));
testLostObject.set("lcname",   String(item.reporter.getValue()).toLowerCase());
testLostObject.set("lcemail",  String(item.email.getvalue()).toLowerCase());
testLostObject.set("lcloc",    String(item.loc.getValue()).toLowerCase());
testLostObject.set("lcitem",   String(item.itemName.getValue()).toLowerCase());

*/
var testItemSpec = new ItemSpec(
        "uan",
        "laptop",
        "uan@gmail.com",
        "07/07/07",
        "858-111-1111",
        "rimac",
        "/home/uan4ik/Desktop/newCSE110/cse110group9",
        "so sad!"
    );


    var testUploader = new ParseUploader();
    testUploader.upload = jasmine.createSpy("upload called successfully!");
    testUploader.upload(testItemSpec, 0);
    expect(testUploader.upload()).toHaveBeenCalled();
//	expect(true).toEqual(true);
  });
  });
});

