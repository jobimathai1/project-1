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

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", "https://us19.api.mailchimp.com/3.0/lists/ba051ccc3c/members/");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("username", "anyuser");
  xhr.setRequestHeader("password", "569e7595-c6c7-4510-88b4-dff3fad570fb");

  // Clear the form fields on submit
  $("#firstName").val("");
  $("#lastName").val("");
  $("#mailingAddress").val("");
  $("#emailAddress").val("");
});


