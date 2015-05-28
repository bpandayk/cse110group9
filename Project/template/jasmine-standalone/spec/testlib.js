
describe("Test lib for OOP", function() {
    function Fruit(name,season) {
	this.name = name;
	this.season = season;
}
    function Apple(brand) {
	this.name = "Apple";
	this.brand = brand;
}
 	extend(Apple,Fruit);
	it("apple should extend Fruit", function() {
	expect(Apple.prototype.superClass).toEqual(Fruit.prototype);
});


});
