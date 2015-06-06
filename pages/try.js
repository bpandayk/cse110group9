// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// ==/ClosureCompiler==

/*var Vechicle = function(year) {
 //this.Name = Name;
 this.year = year;
 //this.model = model;
}

Vechicle.prototype.old= function(yr) {
 var old = yr- this.year;
    return old;
}

var Car = function(Name, year, model,com) {
  this.Name = Name;
  this.year = year;
  this.model = model;
  this.com = com;

}

Car.prototype = Object.create(Vechicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.engine = function() {
 var r = "V8 Hemi";
    return r;
}



/*var amm = new Car('dodge', 2009, 'charger', 'GM');
console.log(amm.Name);
console.log(amm.year);
console.log(amm.model);
console.log(amm.com);
console.log(amm.old(2018));
console.log(amm.engine());*/


///////////////////////////////////////
/*var passanger = function(driver, Name, yr, model, com) {
  this.driver = driver;
  this.ccar = new Car(Name,yr,model,com);

}

//passanger.prototype = Object.create(Car.prototype);
//passanger.prototype.constructor = passanger;
passanger.prototype.currDriver = function() {

  console.log("Current driver of "+this.ccar.Name + "is " + this.driver);
}

passanger.prototype.eng = function() {
  var i = this.ccar.engine();
  var j = this.ccar.old(2015);
  console.log(i);
  console.log(j);
}



var n = new passanger('Bibek', 'Honda', 2013, 'accord', 'japanese' );
n.currDriver();
n.eng();*/

$(document).ready({

});


  /*Parse.initialize(
          "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
          "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
          );

  var to1 = "bibekkshetri@gmail.com" ;
  var subject1 = "wats up";
  var body1 = "kfjjdhfkjdfdfjkdshakjfhdhfdskfdsfdfi4o4kjdhfe";
  console.log(to1);

  Parse.Cloud.run('sendEmail', {to:to1, subject:subject1,text:body1},{
    success:function() {
      console.log("sent");
    },
    error:function(error) {
      console.log("not sent");
    }
  });

Parse.initialize(
        "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
        );

Parse.Cloud.run('hello', {}, {
  success: function(result) {
    console.log(result);
  },
  error: function(error) {
  }
});
*/


Parse.initialize(
        "NJy4H7P2dhoagiSCTyoDCKrGbvfaTI1sGCygKTJc",
        "2D0fOvD5ftmTbjx2TJluZo7vZFzYHhm8tOHOjOFs"
        );


var user1= 'bibekkshetri';
var password1= 'Sarbada1';
var phone1='5109848659';
var message1='HAHA SIR , MAKE TEA FOR ME TOO';

Parse.Cloud.run('sendSMS', {PhoneNumbers:phone1,Message:message1}, {
  success: function(result) {
    console.log(result);
  },
  error: function(error) {
  }
});

$("#clk").click(function(){
  console.log("clk clicked");
  $("#filei").trigger("click");
});

$("#filei").click(function(){
  console.log("filei clicked");
});
