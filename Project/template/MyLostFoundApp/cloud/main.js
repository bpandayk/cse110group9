
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:

var Mailgun = require('mailgun');
Mailgun.initialize('sandbox0debf4139c3f4f6db7d09179c00e4ad6.mailgun.org','key-42d81cdb47fe798f32503e25209aa88f');


Parse.Cloud.define("sendEmail", function(request, response) {
  Mailgun.sendEmail({
    to: request.params.to,
    from: "bibek@gmail.com",//request.params.from,
    subject: request.params.subject,
    text: request.params.text
  },{
    success:function(httpResponse) {
      console.log(httpResponse);
      response.success("Email sent!");
    },
    error:function(httpResponse){
      console.error(httpResponse);
      response.error("Email send error");
    }
  });
});



Parse.Cloud.define("sendSMS", function(request, response) {
  Parse.Cloud.httpRequest({
    method:'POST',
    url: 'https://app.eztexting.com/sending/messages?format=json',
    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
    body: {
      User: 'bibekkshetri',
      Password: 'Sarbada1',
      PhoneNumbers:request.params.PhoneNumbers,
      Message:request.params.Message
    }
  }).then(function(httpResponse){
    console.log(httpResponse.text);
    response.success("sent");
  }, function(httpResponse) {
    console.error(httpResponse.error);
    response.error("Failed");
  });
});
