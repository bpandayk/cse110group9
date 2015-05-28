describe("test Downloader", function(){
  it("downloads data", function(){
    Parse.initialize("NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
                    "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs");    
    var sampleInfo = {
          name :'winson',
	  item:'laptop',
	  lostdate:'03032015',
	  loc:'library',
	  phone:'123456789'},
    downloader = new j$.ParseDownloader(),
    message = downloader.message(sampleInfo);

    expect(message).toEqual('winson,laptop,03032015,library,123456789');
    });
  });
