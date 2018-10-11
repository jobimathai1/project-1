// Initialize Firebase

var config = {
  apiKey: config.FB_KEY,
  authDomain: "pet-pride.firebaseapp.com",
  databaseURL: "https://pet-pride.firebaseio.com",
  projectId: "pet-pride",
  storageBucket: "",
  messagingSenderId: "1083593070841"
};
firebase.initializeApp(config);

var dataRef = firebase.database();
var first_name = "";
var last_name = "";
var mail_address = "";
var email_address = "";


$("#btn-add").on("click", function(event){
  event.preventDefault();

  // Add the values from form fields into the variable
  first_name = $("#firstName").val().trim();
  last_name = $("#lastName").val().trim();
  mail_address = $("#mailingAddress").val().trim();
  email_address = $("#emailAddress").val().trim();

  // Push the data from the variables into the firebase db
  dataRef.ref("subscribers").push({
    first_name: first_name,
    last_name: last_name,
    mail_address: mail_address,
    email_address: email_address,
    subscriber_status: "1",
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  // Clear the form fields on submit
  $("#firstName").val("");
  $("#lastName").val("");
  $("#mailingAddress").val("");
  $("#emailAddress").val("");
});
// dataRef.ref().on("child_added", function(childSnapshot){
//   console.log()
// })

// var queryURL = "https://us19.api.mailchimp.com/3.0/lists/ba051ccc3c/members/"


// //Create variables to store what the mailing list form is sending
// var fName = $("#firstName").val().trim();
// var lName = $("#lastName").val().trim();
// var mailAddress = $("#mailingaddress").val().trim();
// var emailAddress = $("#emailAddress").val().trim();


// // xhr = new XMLHttpRequest();
// // xhr.open('POST', queryURL, true);
// // xhr.setRequestHeader("Content-Type", "application/json");
// // xhr.setRequestHeader("Authorization", "Basic YW55dXNlcjpmMWVjOWFhNzU2ZTFhYzMzODA1Y2U4NjIyNDRkNWFjYi11czE5");
// // xhr.send({
// //   "email_address":emailAddress,
// //   "status": "subscribed",
// //   "merge_fields": {
// //     "FNAME": fName,
// //     "LNAME": lName,
// //     "ADDRESS": mailAddress
// //   }
// // })

// // On Mailing List submit do the following:

// var data = JSON.stringify({
//   // Just testing the API for now. Still need to figure out how to send the data to mailchimp
//   "email_address": "jobi@jobi.com",
//   "status": "subscribed",
//   "merge_fields": {
//     "FNAME": "jobi",
//     "LNAME": "mathai",
//     "ADDRESS": "123 main st",
//     "PHONE": "3102229999",
//   }
// });

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "https://us19.api.mailchimp.com/3.0/lists/ba051ccc3c/members/");
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.setRequestHeader("cache-control", "no-cache");
// xhr.setRequestHeader("username", "anyuser");
// xhr.setRequestHeader("Postman-Token", "5bfd3b36-9cc7-4a74-ad6e-49e095d2a7b4");
// xhr.send(data);



