// Initialize Firebase
var apiKeys = require('../config/keys/keys');

// remove before pushing up to the repo
// console.log('**** firebase key', apiKeys.firebaseKey);
// console.log('**** mailchimp key', apiKeys.mailchimpKey);

var config = {
  // use line 10 instead
  apiKey: apiKeys.firebaseKey,
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