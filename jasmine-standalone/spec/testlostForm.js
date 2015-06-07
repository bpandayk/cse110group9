
/*
$('head').append(
'<input type="text" id="lostdate">'
);
*/

describe("LostForm functionality test", function() {

	function notAUploader(){};
    var uploader = new notAUploader();

    it("Alert when uploader is not valid", function() {
        spyOn(window,'alert');
        var lostForm = new LostForm(uploader);
        expect(window.alert).toHaveBeenCalledWith('LostForm has to have an Uploader!');
    });

});

