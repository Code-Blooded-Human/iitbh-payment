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
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//     app.receivedEvent('deviceready');
//     nfc.connect(function(){
//     	alert("Connected");
//     },function(){
//     	alert("DisConnected");
//     });
//     // Read NDEF formatted NFC Tags
//     nfc.addNdefListener (
//         function (nfcEvent) {
//             var tag = nfcEvent.tag,
//                 ndefMessage = tag.ndefMessage;

//             // dump the raw json of the message
//             // note: real code will need to decode
//             // the payload from each record
//             alert(JSON.stringify(ndefMessage));

//             // assuming the first record in the message has
//             // a payload that can be converted to a string.
//             alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
//         },
//         function () { // success callback
//             alert("Waiting for NDEF tag");
//         },
//         function (error) { // error callback
//             alert("Error adding NDEF listener " + JSON.stringify(error));
//         }
//     );
// },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };


const DESFIRE_SELECT_PICC = '00 A4 00 04 02 3F 00 20';
//const DESFIRE_SELECT_AID = '00B000000050';


 function handleDesfire(nfcEvent) {
    
    const tagId = nfc.bytesToHexString(nfcEvent.tag.id);
    console.log('Processing', tagId);

    try {
        nfc.connect();
        //console.log('connected to', tagId);
        
        //let response = await nfc.transceive(DESFIRE_SELECT_PICC);
        //ensureResponseIs('9000', response);
        
        response =  nfc.transceive(DESFIRE_SELECT_AID);
        //ensureResponseIs('9100', response);
        // 91a0 means the requested application not found

        //alert('Selected application AA AA AA');
        console.log(response);
        // more transcieve commands go here
        
    } catch (error) {
        alert(error);
    } finally {
        //await nfc.close();
        console.log('closed');
    }

}

// function ensureResponseIs(expectedResponse, buffer) {
//     const responseString = util.arrayBufferToHexString(buffer);
//     if (expectedResponse !== responseString) {
//         const error = 'Expecting ' + expectedResponse + ' but received ' + responseString;
//         throw error;
//     }
// }

function onDeviceReady() {
    nfc.addTagDiscoveredListener(handleDesfire);
}

document.addEventListener('deviceready', onDeviceReady, false);