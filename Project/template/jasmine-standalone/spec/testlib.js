
describe("Test lib for OOP", function() {
	
    function Fruit(name,season) {
	this.name = name;
	this.season = season;
	}
	Fruit.prototype.category = "Food";
    function Apple(brand) {
	this.name = "Apple";
	this.brand = brand;
	}

	extend(Apple,Fruit);
	var fuji = new Apple("Fuji");

	it("apple should extend Fruit", function() {
	expect(Apple.prototype.superClass).toEqual(Fruit.prototype);
	});

	it("any brand of Apple should have name Apple", function() {
	expect(fuji.name).toEqual("Apple");
	});
	
	it("isA describe instanciation relationship", function(){
	expect(fuji.isA(Fruit)).toBeTruthy();
	});

	it("use extend function to instanciate superclass's property", function(){
	expect(fuji.category).toEqual("Food");
	expect(fuji.superClass.category).toEqual("Food");
	});

	it("superCLass does not extend subclass property by using extend",
	    function(){
	expect(fuji.superClass.brand).toBe(undefined);
	});

});
