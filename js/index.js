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
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    app.receivedEvent('deviceready');
    nfc.addTagDiscoveredListener(app.onNfc,function () { },function (reason) { alert("Ups: " + reason); });
    },
    onNfc: function (nfcEvent) {
      console.log('onNfc');

      var tag = nfcEvent.tag;

      nfc.connect(
        app.onConnected, // chipcard connected
        function ()       { console.log('connection successful'); },
        function (reason) { console.log('connect failed: ' + reason); }
      );
    },

    onConnected: function () {
      console.log("Running");
      nfc.transceive("00A40004023F0020",function (data) {console.log("transceive successful: " + data); nfc.close(
            app.onConnected, // remove hander
            function ()       { console.log('close successful'); },
            function (reason) { console.log('close failed: ' + reason); }
          );},function (reason) {console.log("transceive failed: " + reason);});
      
    },



    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');
        //
        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
