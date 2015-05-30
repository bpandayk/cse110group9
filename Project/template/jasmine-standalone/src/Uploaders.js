
function Uploader() {}
// ======================================================================
// ParseUploader

function ParseUploader() {}
extend(ParseUploader,Uploader);


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
 /*
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
*/
};

