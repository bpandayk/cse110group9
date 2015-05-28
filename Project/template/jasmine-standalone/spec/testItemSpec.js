describe("Testing ItemSpec functions", function() {

	/* create obj object and val() function */
	function obj(value){
		this.v = value;
	};
	obj.prototype.val = function() {
		return this.v;
	};
	obj.prototype.datepicker = function() {};
	obj.prototype.bind = function() {};

	var name = new obj("Max");
	var empty = new obj("");

	it("val should get the value of the obj", function() {
		expect(name.val()).toEqual("Max");
	});

	/* tests for Name*/
	describe("test Name", function() {
		var validName = new Name(name);
		var invalidName = new Name(empty);

		it("getValue should get the value of the object", function() {
			expect(validName.getValue()).toEqual("Max");
		});

		it("valid names should return true", function() {
			expect(validName.validate()).toBeTruthy();
		});

		it("blank names should return false", function() {
			expect(invalidName.validate()).toBeFalsy();
		});
	});

	/* tests for ItemName */
	describe("test ItemName", function() {
		var itemName = new obj("Laptop");

		var validItemName = new ItemName(itemName);
		var invalidItemName = new ItemName(empty);

		it("valid item names should return true", function() {
			expect(validItemName.validate()).toBeTruthy();
		});

		it("blank item names should return false", function() {
			expect(invalidItemName.validate()).toBeFalsy();
		});
	});

	/* tests for Email */
	describe("test Email", function() {
		var email = new obj("max.m@ucsd.edu");
		var noAt = new obj("ucsd.edu");
		var noDot = new obj("max@ucsd");
		var badEmail = new obj("max.m@ucsd");

		var validEmail = new Email(email);
		var invalidEmail1 = new Email(noAt);
		var invalidEmail2 = new Email(noDot);
		var invalidEmail3 = new Email(badEmail);

		it("valid emails should return true", function() {
			expect(validEmail.validate()).toBeTruthy();
		});

		it("emails with no '@' should return false", function() {
			expect(invalidEmail1.validate()).toBeFalsy();
		});

		it("emails with no '.' should return false", function() {
			expect(invalidEmail2.validate()).toBeFalsy();
		});

		it("emails with no '@' occuring before last '.' should return false", function() {
			expect(invalidEmail3.validate()).toBeFalsy();
		});
	});

	/* tests for ReportDate */
	describe("test ReportDate", function() {
		var date = new obj("05/30/2015");
		var noDay = new obj("05/2015");
		var noYear = new obj("05/30");
		var noDate = new obj("0123456789");

		var validDate = new ReportDate(date);
		var invalidDate1 = new ReportDate(noDay);
		var invalidDate2 = new ReportDate(noYear);
		var invalidDate3 = new ReportDate(noYear);

		it("valid dates should return true", function() {
			expect(validDate.validate()).toBeTruthy();
		});

		it("dates without day or month should return false", function() {
			expect(invalidDate1.validate()).toBeFalsy();
		});

		it("dates without year should return false", function() {
			expect(invalidDate2.validate()).toBeFalsy();
		});

		it("invalid should return false", function() {
			expect(invalidDate3.validate()).toBeFalsy();
		});
	});

	/* tests for Phone */
	describe("test Phone", function() {
		var phone = new obj("0123456789");
		var badPhone = new obj ("0123");

		var validPhone = new Phone(phone);
		var invalidPhone1 = new Phone(badPhone);
		var invalidPhone2 = new Phone(empty);


		it("valid phone numbers should return true", function() {
			expect(validPhone.validate()).toBeTruthy();
		});

		it("invalid phone numbers should return false", function() {
			expect(invalidPhone1.validate()).toBeFalsy();
		});

		it("empty phone numbers should return true", function() {
			expect(invalidPhone2.validate()).toBeTruthy();
		});
	});

	/* test for location */
	describe("test Location", function() {
		var location = new Location(empty);

		it("location should always return true", function() {
			expect(location.validate()).toBeTruthy();
		})
	});

	/* test for description */
	describe("test Description", function() {
		var description = new Description(empty);

		it("description should always return true", function() {
			expect(description.validate()).toBeTruthy();
		})
	});

	/* test for image */
	describe("test Image", function() {
		var image = new Image(empty);

		it("image should always return true", function() {
			expect(image.validate()).toBeTruthy();
		})
	});

	/* test for ItemSpec */
	describe("test ItemSpec constructor", function() {
		var itemSpec = new ItemSpec(name, itemName, email
				date, phone, empty, empty, empty);
		
		it("ItemSpec should always return true", function() {
			expect(itemSpec.reporter).toEqual("Max");
		})

	});

});

