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

  first_name = $("#firstName").val();
  last_name = $("#lastName").val();
  mail_address = $("#mailingAddress").val();
  email_address = $("#emailAddress").val();

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



