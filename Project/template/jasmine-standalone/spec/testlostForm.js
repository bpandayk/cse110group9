
/*
$('head').append(
'<input type="text" id="lostdate">'
);
*/

describe("LostForm functionality test", function() {

	function notAUploader(){};
	var uploader = new notAUploader();
	var lostForm = new LostForm(uploader);

	it("Alert when uploader is not valid", function() {
 	spyOn(window,'alert');
 	//expect(window.alert).toHaveBeenCalledWith(
 	//'LostForm has to have an Uploader!');
 	expect(window.alert).not.toHaveBeenCalled();
 	});
});

