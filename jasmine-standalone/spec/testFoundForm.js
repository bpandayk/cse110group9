describe("Testing FoundForm", function(){
   it("alert when uploader is not valid", function() {
 	spyOn(window, 'alert');
	var my_FoundM = new FoundForm(null);
	//expect(true).toEqual(true);
	expect(window.alert).toHaveBeenCalledWith('FoundForm has to have an Uploader!');
   });
   it("test something else...", function(){
     var ItemSpecCalled = spyOn(window, "ItemSpec");
     var uploader = new ParseUploader();
     var foundForm = new FoundForm(uploader);
     expect(ItemSpecCalled).toHaveBeenCalled();
     //expect(true).toEqual(true);
   });
});
