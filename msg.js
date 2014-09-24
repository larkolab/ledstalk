var feedID        = 144422134;             // Feed ID (the last number on the URL on the feed page on Xively)
var message_datastreamID  = "MESSAGE_CHANNEL";     // Datastream ID
var presence_datastreamID  = "PRESENCE_CHANNEL";     // Datastream ID
var selector      = "#presence_element";   // Your element on the page - takes any valid jQuery selector

// Set the Xively API key (https://xively.com/users/YOUR_USERNAME/keys)
xively.setKey( "Y8bnZpN22M05lpN3qlFd26JNJKzoXCc4Ppmf7NKExv9bQecw" );

// Set datastream data to Xively when button is pressed
function sendMessage() {
  // Get message from input text box
  var message = document.getElementById('message_id').value;

  //alert("send: " + message);
  xively.datastream.update(feedID, message_datastreamID, {current_value: message}, function(data){ alert("channel updated");})
}

// Make sure the document is ready to be handled
$(document).ready(function($) {
  // Get datastream data from Xively
  xively.datastream.get (feedID, presence_datastreamID, function ( datastream ) {
    // WARNING: This code is only executed when we get a response back from Xively, it will likely execute after the rest your script
    // NOTE: The variable "datastream" will contain all the Datastream information as an object. The structure of Datastream objects can be found at: 
    // https://xively.com/dev/docs/api/quick_reference/api_resource_attributes/#datastream

    // Display the current value from the datastream
    $(selector).html( datastream["current_value"] );

    // Getting realtime! The function associated with the subscribe method will be executed every time there is an update to the datastream
    xively.datastream.subscribe( feedID, presence_datastreamID, function ( event , datastream_updated ) {
      // Display the current value from the updated datastream
      $(selector).html( datastream_updated["current_value"] );
    });
  });

  // WARNING: Code here will continue executing while we get the datastream data from Xively, use the function associated with datastream.get to work with the data, when the request is complete
});
