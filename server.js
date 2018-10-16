var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//Set static path
app.use(express.static(path.join(__dirname, 'public')));


//Setting up routes for the pages
app.get('/', function(req, res){
    res.render('index');
});

app.get('/donations', function(req, res){
    res.sendFile("public/donations.html", {root: __dirname});
});

app.get('/mailingList', function(req, res){
    res.sendFile("public/mailingList.html",{root: __dirname});
});

app.get('/programs', function(req, res){
    res.sendFile("public/programs.html",{root: __dirname});
});

app.get('/aboutus', function(req, res){
    res.sendFile("public/about.html",{root: __dirname});
});
//end routes setup

app.listen(3000, function(){
    console.log('server started on port 3000');
});

