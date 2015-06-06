
importScripts = [
    '../js/lib.js',
];
importScripts.forEach(function(val,index,arr) {
    $("head").append(
        '<script type="text/javascript" src="' + val + '"></script>'
    );
});

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
var PARSEUPLOAD_CODE_LOST = 0;
var PARSEUPLOAD_CODE_FOUND = 1;
ParseUploader.prototype.upload = function(item,obj_type){
    console.log('entered ParseUploader.upload...');

    // parameter has to be an ItemSpec
    if (!item || !item instanceof ItemSpec) return;
    console.log('input is an ItemSpec (great!)');

    console.log('initializing parse account...');
    Parse.initialize(
            "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
            "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
            );
    console.log('done');
    var upload_obj;
    if (obj_type === PARSEUPLOAD_CODE_LOST) {
        console.log('upload type: LOST');
        var Lost = Parse.Object.extend("Lost");
        upload_obj = new Lost();
    } else if (obj_type === PARSEUPLOAD_CODE_FOUND) {
        console.log('upload type: FOUND');
        var Found = Parse.Object.extend("Found");
        upload_obj = new Found();
    } else {
        console.log('Wrong obj_code for ParseUploader.upload');
    }


    var phone;
    var location;
    if(item.phone.getValue() == '')
      phone = "Not Available";
    else {
      phone = item.phone.getValue();
    }

    if(item.loc.getValue() == '')
      location = "Not Availabe";
    else {
      location = item.loc.getValue();
    }

    var dt = new Date(item.reportDate.getValue());
    dt = dt.toISOString()

    console.log(phone);
    console.log(location);
    // set data of upload_obj
    // notice image is NOT in the list and will be handled at uploading
    console.log('setting new upload_obj...');
    upload_obj.set("name",     String(item.reporter.getValue()));
    upload_obj.set("item",     String(item.itemName.getValue()));
    upload_obj.set("email",    String(item.email.getValue()));
    upload_obj.set("lostdate", String(item.reportDate.getValue()));
    upload_obj.set("phone",    String(phone));
    upload_obj.set("loc",      String(location));
    upload_obj.set("descp",    String(item.description.getValue()));
    upload_obj.set("LCname",   String(item.reporter.getValue()).toLowerCase());
    upload_obj.set("LCemail",  String(item.email.getValue()).toLowerCase());
    upload_obj.set("LCloc",    String(location.toLowerCase()));
    upload_obj.set("LCitem",   String(item.itemName.getValue()).toLowerCase());
    upload_obj.set("isodate",  String(dt));
    console.log('done');

    // save myLost to parse
    console.log('uploading data to parse...');
    upload_obj.save(null, {
        success: function(upload_obj) {
            console.log('data saved sucessfully');
            console.log('start uploading photo');
            console.log('photo is', item.img.getValue() );
            /*if(item.img.getValue() == undefined) {
              console.log("photo unavaibale, uploading defult photo");
              item.img.file.src = "../img/Noimage.png";
              console.log('photo is', item.img.getValue() );
            }*/
            if (item.img.file && obj_type === PARSEUPLOAD_CODE_FOUND )
              ParseUploader.prototype.uploadFile(item.img.file,upload_obj.id, "Found");
            else if (item.img.file && obj_type === PARSEUPLOAD_CODE_LOST )
                ParseUploader.prototype.uploadFile(item.img.file,upload_obj.id, "Lost");
            else if(obj_type === PARSEUPLOAD_CODE_LOST) {
              document.location.href = "../pages/newLostPage.html";
            } else if(obj_type === PARSEUPLOAD_CODE_FOUND) {
              document.location.href= "../pages/newFoundPage.html";
            }
            console.log('done');
        },
        error: function(upload_obj, error) {
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

ParseUploader.prototype.uploadFile = function(file,objID, classes) {
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
            ParseUploader.prototype.linkDataTo(data, objID, classes);
        },
        error: function(data) {
            var obj = jQuery.parseJSON(data);
            console.error("Error: ");
        }
    });
}

// --------------------------------------------------
// link data (esp. files) to a parse obj.

ParseUploader.prototype.linkDataTo = function(data, objID, classes) {
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
        'url': "https://api.parse.com/1/classes/"+classes+"/"+objID,
        "contentType": "application/json",
        "dataType": "json",
        'success': function(data) {
            console.log("post uploaded successfully");
            if(classes == 'Lost') {
              document.location.href = "../pages/newLostPage.html";
            } else if(classes =='Found') {
              document.location.href= "../pages/newFoundPage.html";
            }
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
