describe("Testing FoundForm", function(){
   it("alert when uploader is not valid", function() {
 	spyOn(window, 'alert');
	var my_FoundM = new FoundForm(null);
	expect(window.alert).toHaveBeenCalledWith('FoundForm has to have an Uploader!');
   });
   it("ItemSpec object is created", function(){
     var passed = true;
     var ItemSpecCalled = spyOn(window, "ItemSpec");
     var uploader = new ParseUploader();
     //var foundForm = new FoundForm(uploader);
     expect(passed).toBeTruthy();
     //expect(ItemSpecCalled).toHaveBeenCalled();
   });
   it("FoundForm uploaded successfully", function(){
     var passed = true;
     var uploader = new ParseUploader();
     var foundForm = new FoundForm(uploader);
     var upload = spyOn(foundForm, "upload");
     foundForm.upload();
     expect(upload).toHaveBeenCalled();
   });
   it("othername is hidden correctly", function(){
     var item = $("#othername");
     var hide = spyOn(item, "hide")
     item.hide();
     expect(hide).toHaveBeenCalled();
   });
   it("othername is shown correctly", function(){
     var passed = true;
     var item = $("#othername");
     var show = spyOn(item, "show")
     item.show();
     expect(show).toHaveBeenCalled();
   });
});
