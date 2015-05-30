describe("ItemSpec tests validate functions", function()
{
    function Field(){}

	function Name(obj) {
		this.obj = obj;
	}
	extend (Name, Field);

	var validName = new Name("Max");
	var invalidName = new Name("");

	it("getValue should get the value of the object", function(){
		expect(validName.prototype.getValue()).toEqual("Max");
	});
});