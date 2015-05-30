describe("test ItemSpec functions", function() {
	
	/* create obj object and val() function */
	function obj(value){
		this.v = value;
	};
	obj.prototype.val = function() {
		return this.v;
	};

	var name = new obj("Max");
	var noName = new obj("");

	/*it("val should get the value of the obj", function() {
		expect(name.val()).toEqual("Max");
	}); */

	/* tests for Name*/
	var validName = new Name(name);
	var invalidName = new Name(noName);

	it("getValue should get the value of the object", function() {
		expect(validName.getValue()).toEqual("Max");
	});

	it("valid names sholud return true", function() {
		expect(validName.validate()).toBeTruthy();
	});

	it("invalid names sholud return false", function() {
		expect(invalidName.validate()).toBeFalsy();
	});

	/* tests for ItemName */
	var itemName = new obj("Laptop")
	var validItemName = new ItemName(itemName);
	var invalidItemName = new ItemName(noName);

	it("valid item names sholud return true", function() {
		expect(validItemName.validate()).toBeTruthy();
	});

	it("invalid item names sholud return false", function() {
		expect(invalidItemName.validate()).toBeFalsy();
	});

	/* tests for Email */
	var email = new obj("max@ucsd.edu")
	var validItemName = new ItemName(itemName);
	var invalidItemName = new ItemName(noName);

	it("valid item names sholud return true", function() {
		expect(validItemName.validate()).toBeTruthy();
	});

	it("invalid item names sholud return false", function() {
		expect(invalidItemName.validate()).toBeFalsy();
	});
});