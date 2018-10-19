var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();
var Mailchimp = require('mailchimp-api-v3')
var jsonParser = bodyParser.json()
var apiKeys = require('./public/config/keys/keys');
var mailchimp = new Mailchimp(apiKeys.mailchimpKey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Set static path
app.use(express.static(path.join(__dirname, 'public')));


//Setting up routes for the pages
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/donations', function (req, res) {
    res.sendFile("public/donations.html", { root: __dirname });
});

app.get('/mailingList', function (req, res) {
    res.sendFile("public/mailingList.html", { root: __dirname });
});

app.get('/programs', function (req, res) {
    res.sendFile("public/programs.html", { root: __dirname });
});

app.get('/aboutus', function (req, res) {
    res.sendFile("public/about.html", { root: __dirname });
});
//end routes setup


//Route to send data to MailChimp & then return user to homepage after submitting form.

app.post('/mailchimp', function (req, res) {
    console.log("this is a test");
    mailchimp.post('lists/ba051ccc3c/members', {
        email_address: req.body.eAddress,
        status: "subscribed",
        merge_fields: {
            FNAME: req.body.fName,
            LNAME: req.body.lName,
            ADDRESS: req.body.mAddress
        }
    })
    res.sendFile("public/index.html", { root: __dirname });
});


//for Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
