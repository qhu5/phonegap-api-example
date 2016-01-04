/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {};
app.initialize = function() {
  document.addEventListener("deviceready", app.onDeviceReady, false);
};
app.onDeviceReady = function() {
  app.defaultDeviceReady();

  /* start */
  app.testBatteryStatus();
  // app.testContacts();
  app.testDeviceInfo();
  app.testAccelerometer();
  app.testCompass();
  // app.testNotification();
  app.testFile();
  app.testNetwork();

  // build on cloud
  // app.testCamera();
  /* end */
};
app.defaultDeviceReady = function() {
  var parentElement = document.getElementById("deviceready");
  var listeningElement = parentElement.querySelector('.listening');
  var receivedElement = parentElement.querySelector('.received');

  listeningElement.setAttribute('style', 'display:none;');
  receivedElement.setAttribute('style', 'display:block;');

  console.log('Received Event: ' + "deviceready");
};
app.testBatteryStatus = function() {
  function onBatteryStatus(info) {
    console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
  }
  window.addEventListener("batterystatus", onBatteryStatus, false);
};
app.testCamera = function() {
  console.log("navigator.camera: ", navigator.camera);

  function onSuccess(imageData) {
    console.log(imageData);
  }

  function onFail(message) {
    alert("Failed because: " + message);
  }

  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL
  });
};
app.testContacts = function() {
  function onSuccess(contacts) {
    console.log(contacts);
  };

  function onError(contactError) {
    alert("onError!");
  };

  // find all contacts
  var options = new ContactFindOptions();
  options.filter = "";
  options.multiple = true;
  var filter = ["displayName", "addresses"];
  navigator.contacts.find(filter, onSuccess, onError, options);
};
app.testDeviceInfo = function() {
  console.log(device);
};
app.testAccelerometer = function() {
  function onSuccess(acceleration) {
    console.log("Acceleration X: " + acceleration.x + "\n" +
      "Acceleration Y: " + acceleration.y + "\n" +
      "Acceleration Z: " + acceleration.z + "\n" +
      "Timestamp: " + acceleration.timestamp + "\n");
  }

  function onError() {
    console.log('onError!');
  }

  navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);
};
app.testCompass = function() {
  function onSuccess(heading) {
    console.log("Heading: " + heading.magneticHeading);
  };

  function onError(error) {
    console.log("CompassError: " + error.code);
  };

  navigator.compass.getCurrentHeading(onSuccess, onError);
};
app.testNotification = function() {
  function alertDismissed(buttonIndex) {
    console.log("You selected button: " + buttonIndex);
  }

  navigator.notification.confirm(
    "You are the winner!", // message
    alertDismissed, // callback
    "Game Over", // title
    ["完成", "Cancel"] // buttonName
  );
};
app.testFile = function() {
  console.log(cordova.file.dataDirectory);
  var logOb;
  var fail = function() {

  };
  function writeLog(str) {
  	if(!logOb) return;
  	var log = str + " [" + (new Date()) + "]\n";
  	console.log("going to log "+log);
  	logOb.createWriter(function(fileWriter) {

  		fileWriter.seek(fileWriter.length);

  		var blob = new Blob([log], {type:'text/plain'});
  		fileWriter.write(blob);
  		console.log("ok, in *theory* i worked");
  	}, fail);
  }
  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(dir) {
    console.log("got main dir",dir);
    dir.getFile("log.txt", {create:true}, function(file) {
      console.log("got the file", file);
      logOb = file;
      writeLog("App started");
    });
  });
};
app.testNetwork = function() {
  console.log(navigator.connection.type);
  document.addEventListener("online", function() {
    console.log("online");
  });
  document.addEventListener("offline", function() {
    console.log("offline");
  });
};
