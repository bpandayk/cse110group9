describe("Testing FoundForm", function(){
   it("FormManager", function() {
	spyOn(window, 'alert');
	var my_FoundM = new FoundForm(null);
	//expect(true).toEqual(true);
	expect(window.alert).toHaveBeenCalledWith('FoundForm has to have an Uploader!');
   });
});
