(function(){

  var settings = {
    channel: 'lightBlinker',
    publish_key: 'pub-c-d9cd80ec-703e-49e2-8563-7102c8c75de4',
    subscribe_key: 'sub-c-58cf8858-39f9-11e5-876e-02ee2ddab7fe'
  };

  var pubnub = PUBNUB(settings);

  var temp = document.getElementById('temp');
  var arc1 = document.getElementById("arc1");
  // var blinker_freq = document.getElementById('blinker_freq');
  // var blinker_delay = document.getElementById('blinker_delay');
  // var blinker_btn = document.getElementById('blinker_btn');

  pubnub.subscribe({
    channel: settings.channel,
    callback: function(m) {
      if(m.temp) {
        console.log('came back with data', m);
        var temp = m.temp
        var angle = temp/100 * 360;
        document.querySelector('#temperature-data').innerHTML = temp;
        arc1.setAttribute("d", describeArc(200, 200, 130, 0, parseInt(angle)));
      }
    }
  })

  function publishUpdate(data) {
    pubnub.publish({
      channel: settings.channel, 
      message: data
    });
  }


  var svg = document.getElementById("svg");   
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

    return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
    "M", start.x, start.y, 
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join(" ");
    return d;       
  }

  arc1.setAttribute("d", describeArc(200, 200, 130, 0, 0));
})();