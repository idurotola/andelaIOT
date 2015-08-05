"use strict";

  var settings = {
    channel: 'lightBlinker',
    publish_key: 'pub-c-d9cd80ec-703e-49e2-8563-7102c8c75de4',
    subscribe_key: 'sub-c-58cf8858-39f9-11e5-876e-02ee2ddab7fe'
  };
  var pubnubInit = require('pubnub');
  var needle = require('needle');
  var pubnub = pubnubInit(settings);

  pubnub.subscribe({
    channel: settings.channel,
    callback: function(m) {
      if (m.temp) {
        console.log('came back with data', m);
        var temp = m.temp;

        if (m.temp > 30) {
          var landlord = '08064949432';
          var data = "username=XXXX&password=XXXXXX&sender=AndelaIoT&recipient=" + landlord + "&message=The temperature of the room is is high, temp is" + (m.temp).toString();
          var url = 'http://www.smsparo.com/components/com_spc/smsapi.php';

          needle.post(url, data, function(err, resp) {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    }
  });

  console.log("AndelaIoT started", 'Expect SMS notification as soon as your room temperature becomes abnormal');
