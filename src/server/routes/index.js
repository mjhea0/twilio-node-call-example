var express = require('express');
var router = express.Router();
var twilio = require('twilio');
var js2xml = require('js2xmlparser');

var config = require('../../_config.js');


router.get('/', function(req, res, next) {
  res.render('index');
});

// generate a twilio capability token
router.get('/token', function(req, res, next) {
  var capability = new twilio.Capability(
    config.TWILIO_ACCOUNT_SID,
    config.TWILIO_AUTH_TOKEN
  );
  capability.allowClientOutgoing(config.TWILIO_APP_TOKEN);
  res.send(capability.generate());
});

// generate a twilio capability token
router.get('/number', function(req, res, next) {
  res.send(config.TWILIO_NUMBER);
});


router.get('/data', function(req, res, next){

    var phoneNumber = 'XXXXXXXXXX';

    var callData = {
      'Dial': {
        '@': {
          'action' : '/forward?Dial=true',
          'callerId': 'XXXXXXXXXX'
        },
        'Number': {
          '#' : phoneNumber
        }
      }
    };

    res.header('Content-Type','text/xml').send(js2xml('Response', callData));
});


module.exports = router;
