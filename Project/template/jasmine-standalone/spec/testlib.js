
describe("Test extend in lib for OOP", function() {
	
    function Fruit(name,season) {
	this.name = name;
	this.season = season;
	}
	Fruit.prototype.category = "Food";
    function Apple(brand) {
	this.brand = brand;
	}
        Apple.prototype.name = "Apple";

	extend(Apple,Fruit);
	var fuji = new Apple("Fuji");

	it("subclass should extend superclass", function() {
	expect(Apple.prototype.superClass).toEqual(Fruit.prototype);
	expect(fuji instanceof Fruit).not.toBeTruthy();
	});

	it("var in same class should share public property", function() {
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


describe("deepCopy should really create a new Obj", function() {
	var Country = {};
	Country.states = [];

	var China = deepCopy(Country);

	China.states.push('Xian');
	China.states.push('Fuzhou');

	it("the class that deepCopy another class is independent on itself",
	   function() {
	   expect(China.states[0]).toEqual('Xian');
	   expect(China.states[1]).toEqual('Fuzhou');
	});

	it("the class that has been deepCopy should not be influenced",
	   function() {
            expect(Country.states.length).toEqual(0);
	    expect(Country.states[0]).not.toEqual('Xian');
	   });

});// deepCopy


}); // main testlib
