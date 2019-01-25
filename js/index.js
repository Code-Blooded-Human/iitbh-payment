const DESFIRE_SELECT_PICC = '00 A4 00 04 02 3F 00 20';



function doneok(){
  console.log("SENT");
}
function donenotok(){
  console.log("NOT SENT");
}

function test(){
  console.log("Connected");
  nfc.transceive('00 A4 00 04 02 3F 00 20',doneok,donenotok);
}

function nottest(){
  console.log("Not Connected");
}
 function handleDesfire(nfcEvent) {

    const tagId = nfc.bytesToHexString(nfcEvent.tag.id);
    console.log('Processing', tagId);

    try {
        nfc.connect'',test,nottest);
      //  nfc.transceive()

        //response =  nfc.transceive(DESFIRE_SELECT_AID);

        //console.log(response);


    } catch (error) {
        alert(error);
    } finally {
        nfc.close();
        console.log('closed');
    }

}



function onDeviceReady() {
    nfc.addTagDiscoveredListener(handleDesfire);
}

document.addEventListener('deviceready', onDeviceReady, false);
