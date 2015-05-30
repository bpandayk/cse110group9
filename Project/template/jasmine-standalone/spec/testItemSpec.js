describe("ItemSpec tests validate functions", function() {
	
	function obj(value){
		this.v = value;
	};
	obj.prototype.val = function() {
		return this.v;
	};

	var max = new obj("Max");
	var noName = new obj("");

	it("val should get the value of the obj", function() {
		expect(max.val()).toEqual("Max");
	});

	/* tests for Name's getValue and validate functions*/
	var validName = new Name(max);
	var invalidName = new Name(noName);

	it("getValue should get the value of the object", function() {
		expect(validName.getValue()).toEqual("Max");
	});

	it("valid names sholud return true", function() {
		expect(validName.validate()).toBeTruthy();
	});
});