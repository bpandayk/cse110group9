/* Test cases to test Listall.js*/
describe("Should create an object of Lost and Found class and call all their methods ", function(){
  it ("Downloader() should create a new object named Lost ", function(){
    var lost = new Downloader("Lost", 0,0);
    expect(lost.className).toBe("Lost");

  });
  it ("The value of counter of Lost should be 0", function(){
    var lost = new Downloader("Lost", 0,0);
    expect(lost.counter).toBe(0);
  });

  it ("The value of qcounter of Lost should be 0", function(){
    var lost = new Downloader("Lost", 0,0);
    expect(lost.qcounter).toBe(0);
  });

  it ("Should call Lost.download function", function(){
    var lost = new Downloader("Lost", 0,0);
    spyOn(lost, "download")
    lost.download();
    expect(lost.download).toHaveBeenCalled();

  });

  it ("Should call Lost.querydownload function", function(){
    var lost = new Downloader("Lost", 0,0);
    spyOn(lost, "queryDownload")
    lost.queryDownload("key", new Date());
    expect(lost.queryDownload).toHaveBeenCalled();

});

///////////////////////////////////////////////


  it ("Downloader() should create a new object named Found", function(){
    var lost = new Downloader("Found", 0,0);
    expect(lost.className).toBe("Found");
  });

  it ("The value of counter of Found should be 0", function(){
    var lost = new Downloader("Found", 0,0);
    expect(lost.counter).toBe(0);
  });

  it ("The value of qcounter of Found should be 0", function(){
    var lost = new Downloader("Found", 0,0);
    expect(lost.qcounter).toBe(0);
  });

  it ("Should call Found.download function", function(){
    var lost = new Downloader("Found", 0,0);
    spyOn(lost, "download")
    lost.download();
    expect(lost.download).toHaveBeenCalled();
  });

    it ("Should call Found.querydownload function", function(){
      var lost = new Downloader("Found", 0,0);
      spyOn(lost, "queryDownload")
      lost.queryDownload("key", new Date());
      expect(lost.queryDownload).toHaveBeenCalled();

  });


  it("Should hide the date search bar", function(){
    var item = $(".hideout");
    var hide = spyOn(item, "hide")
    item.hide();
    expect(hide).toHaveBeenCalled();
  });

  it("Should show the date search bar", function(){
    var item = $(".hideout");
    var hide = spyOn(item, "show")
    item.show();
    expect(hide).toHaveBeenCalled();
  });


});




describe("Checks the listmanager class and functions", function(){
    it("should create an object of Listmanager", function(){
      var manager = new ListManager("something");
      //expect(manager.results)toBe("something");
    });


    it("should call drawList", function(){
      var manager = new ListManager("something");
      spyOn(manager, "drawList");
      manager.drawList("data",2);
      expect(manager.drawList).toHaveBeenCalled();
      //expect(manager.results)toBe("something");
    });

    
});
