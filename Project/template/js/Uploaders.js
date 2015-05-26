
// ======================================================================
// Uploader

function Uploader() {}
Uploader.prototype.upload = function(data){};

// ======================================================================
// ParseUploader

function ParseUploader() {}
extend(ParseUploader,Uploader);

// --------------------------------------------------
// upload
ParseUploader.prototype.upload = function(item){
    console.log('entered ParseUploader.upload...');

    // parameter has to be an ItemSpec
    if (!item || !item instanceof ItemSpec) return;
    console.log('input is an ItemSpec (great!)');

    console.log('initializing parse account...');
    Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs",
            "sqkMsAkDsXmqyA5lffaUP8NQLFYPkC4cJKwlvhFt"
            );
    console.log('done');
    var Lost = Parse.Object.extend("Lost");
    var myLost = new Lost();

    // set data of myLost
    // notice image is NOT in the list and will be handled at uploading
    console.log('setting new Lost obj...');
    myLost.set("name",     String(item.reporter.getValue()));
    myLost.set("item",     String(item.itemName.getValue()));
    myLost.set("email",    String(item.email.getValue()));
    myLost.set("lostdate", Date(item.reportDate.getValue()));
    myLost.set("phone",    String(item.phone.getValue()));
    myLost.set("loc",      String(item.loc.getValue()));
    myLost.set("descp",    String(item.description.getValue()));
    myLost.set("LCname",   String(item.reporter.getValue()).toLowerCase());
    myLost.set("LCemail",  String(item.email.getValue()).toLowerCase());
    myLost.set("LCloc",    String(item.loc.getValue()).toLowerCase());
    myLost.set("LCitem",   String(item.itemName.getValue()).toLowerCase());
    console.log('done');

    // save myLost to parse
    console.log('uploading data to parse...');
    myLost.save(null, {
        success: function(myLost) {
            console.log('data saved sucessfully');
            console.log('start uploading photo');
            console.log('photo is', item.img.getValue() );
            ParseUploader.prototype.uploadFile(item.img.file,myLost.id);
            console.log('done');
        },
        error: function(myLost, error) {
            console.log('data did NOT save sucessfully');
            // TODO what to say / do?
            alert('Some error occured, please try later!');
        }
    });
    console.log('done');

    console.log('left ParseUploader.upload.');
};

// --------------------------------------------------
// upload file

ParseUploader.prototype.uploadFile = function(file,objID) {
    console.log('entered ParseUploader.uploadFile');

    // setups
    var serverUrl = 'https://api.parse.com/1/files/'+file.name;
    var headers = {
        "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
    };

    // uploading using AJAX
    $.ajax({
        type: "POST",
        "headers": headers,
        url: serverUrl,
        data: file,
        processData: false,
        contentType: false,
        success: function(data) {
            console.log('successfully uploaded file '+file+' to '+objID);
            // link the newly added file to related parse obj
            ParseUploader.prototype.linkDataTo(data, objID);
        },
        error: function(data) {
            var obj = jQuery.parseJSON(data);
            console.error("Error: ");
        }
    });
}

// --------------------------------------------------
// link data (esp. files) to a parse obj.

ParseUploader.prototype.linkDataTo = function(data, objID) {
    console.log(data);
    console.log(objID);

    var headers = {
        "X-Parse-Application-Id": "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "X-Parse-REST-API-Key": "RHHtZvYCPb4AOiy2psXnkLlf1uyuD7RJQxUDoQ1Y"
    };
    $('#uploadedLink').append(data.url);
    $.ajax({
        'type': "PUT",
        'headers': headers,
        'url': "https://api.parse.com/1/classes/Lost/"+objID,
        "contentType": "application/json",
        "dataType": "json",
        'success': function(data) {
            console.log("post uploaded successfully");
            // TODO what to do?
        },
        'error': function(data) {
            console.log("an error occured during post upload");
            // TODO what to do?
        },
        "data": JSON.stringify({
            "myfile": {
                "name": data.name,
        "__type": "File"
            }
        })
    });
};

// --------------------------------------------------

