describe("Testing FoundForm", function(){
   it("alert when uploader is not valid", function() {
 	spyOn(window, 'alert');
	var my_FoundM = new FoundForm(null);
	//expect(true).toEqual(true);
	expect(window.alert).toHaveBeenCalledWith('FoundForm has to have an Uploader!');

//      expect(true).toBe(true);
   });
});
