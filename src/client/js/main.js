// add scripts

$(document).on('ready', function() {

  getToken();

  Twilio.Device.disconnect(function(connection) {
    $('#status').html('Call disconnected');
  });

  $('#hangup').click(function() {
    Twilio.Device.disconnectAll();
  });

  $('#call').on('click', function() {
    makeCall();
  });

});

function getToken() {
  $.get('/token', function(data) {
    Twilio.Device.setup(data);
  });
}

function makeCall() {
  $.get('/number', function(data) {
    Twilio.Device.connect({
      PhoneNumber:data
    });
  });
}
