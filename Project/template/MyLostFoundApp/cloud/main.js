
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


Parse.Cloud.define("hello", function(request, response) {
  console.log("hello");
  response.success("Hello world!");
});
