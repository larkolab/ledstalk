var container = document.querySelector('.masonry');
var msnry = new Masonry( container, {
  // options
  columnWidth: 100,
  //isFitWidth: true
});

// See http://xively.github.io/xively-js/tutorial/ for details

var feedID        = 144422134;
var message_datastreamID  = "MESSAGE_CHANNEL";
var presence_datastreamID  = "PRESENCE_CHANNEL";
var temperature_datastreamID = "TEMPERATURE_CHANNEL";

xively.setKey( "Y8bnZpN22M05lpN3qlFd26JNJKzoXCc4Ppmf7NKExv9bQecw" );

// Set datastream data to Xively when button is pressed
function sendMessage() {
  // Get message from input text box
  var message = document.getElementById('message_id').value;

  xively.datastream.update(feedID, message_datastreamID, {current_value: message}, function(data){ /*alert("channel updated");*/})
}

function setPresenceColor(object, presence_status) {
  if (presence_status == 0) {
    object.css('background-color', 'red');
  } else {
    object.css('background-color', 'green');
  }
}

// Make sure the document is ready to be handled
$(document).ready(function($) {
  //
  // Get PRESENCE datastream data from Xively
  //
  xively.datastream.get (feedID, presence_datastreamID, function ( datastream ) {
    // Display the current value from the datastream
    $("#presence_element").html( datastream["current_value"] );
    // TODO: NOT WORKING??
    //setPresenceColor($(this).find('#presence'), datastream["current_value"]);

    // Getting realtime!
    xively.datastream.subscribe( feedID, presence_datastreamID, function ( event , datastream_updated ) {
      // Display the current value from the updated datastream
      $("#presence_element").html( datastream_updated["current_value"] );
      setPresenceColor($(this).find('#presence'), datastream_updated["current_value"]);
    });
  });

  //
  // Get TEMPERATURE datastream data from Xively
  //
  xively.datastream.get (feedID, temperature_datastreamID, function ( datastream ) {
    // Display the current value from the datastream
    $("#temperature_element").html( datastream["current_value"] );

    // Getting realtime!
    xively.datastream.subscribe( feedID, temperature_datastreamID, function ( event , datastream_updated ) {
      // Display the current value from the updated datastream
      $("#temperature_element").html( datastream_updated["current_value"] );
    });
  });

});
