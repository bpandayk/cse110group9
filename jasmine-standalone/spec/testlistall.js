describe("Testing vakidation in listall.js", function(){
  it("hideout was hidden successfully", function(){
    var hideout = $(".hideout");
    var spyHideout = spyOn(hideout, "hide");
    window["main"]();
    hideout.hide();
    expect(spyHideout).toHaveBeenCalled();
  });
  it("check phone validity", function(){
    var fphone = 444;
    var fakeValidator = new Validator();
    var result = fakeValidator.validPhone(fphone);
    expect(result).toEqual(false);
  });
  it("check email validity", function(){
    var femail = "fake";
    var fakeValidator = new Validator();
    var result = fakeValidator.validEmail(femail);
    expect(result).toEqual(false);
  });
  it("SMS object is NOT valid", function(){
    var fphone = 858333;
    var fname = "fakename";
    var fbody = "fakesmsbody";
    var fakeValidator = new Validator();
    var result = fakeValidator.validSmsform(fname, fphone, fbody);
    expect(result).toEqual(false);
  });
  it("SMS object is valid", function(){
    var fphone = 8586564333;
    var fname = "fakename";
    var fbody = "fakesmsbody";
    var fakeValidator = new Validator();
    var result = fakeValidator.validSmsform(fname, fphone, fbody);
    expect(result).toEqual(true);
  });
});
