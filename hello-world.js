chrome.runtime.onInstalled.addListener(function() {
  console.log("Hello, World!");
  var xhr = new XMLHttpRequest();
  const data = 'segments[0][origin]=DUB&segments[0][destination]=LCY&cabin_class=economy&currencies[]=EUR'
  var myHeaders = new Headers({
    'Authorization': 'Basic NGYyOWZiNmEyZmI5ZmU4NzQ0M2UzYTQ3Og==',
    'Content-Type': 'text/plain'
  });

  const myInit = {
    method: 'POST',
    headers: myHeaders,
    body: data
  };

  fetch("https://api.goclimateneutral.org/v1/flight_footprint", myInit)
    .then(response=>response.text())
    .then(function(data) {
      console.log("Request succeeded with JSON response", data);

    })
    .catch(function(error) {
      console.log("Request failed", error);
    });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([
          {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlContains: "concursolutions",
              schemes: ["https", "http"]
            }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]
    );
  });
});
