var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mailing List' });
});

router.get('/mail', function(req, res, next){
  res.render('index', {title: 'Mailing List'} )
});

module.exports = router;
