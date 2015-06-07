/* Test cases to test Listall.js*/
describe("Should create an object of Lost and Found class ", function(){
  it ("Downloader() should create a new object named Lost ", function(){
    var lost = new Downloader("Lost", 0,0);
    expect(lost.className).toBe("Lost");


  });


  it ("Downloader() should create a new object named Found", function(){
    var lost = new Downloader("Found", 0,0);
    expect(lost.className).toBe("Found");
  });




});
