package com.example.test

import android.nfc.NfcAdapter
import android.nfc.Tag
import android.nfc.tech.IsoDep
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), NfcAdapter.ReaderCallback {

    private var nfcAdapter: NfcAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
    }

    public override fun onResume() {
        super.onResume()
        nfcAdapter?.enableReaderMode(this, this,
            NfcAdapter.FLAG_READER_NFC_A or NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
            null)
    }

    public override fun onPause() {
        super.onPause()
        nfcAdapter?.disableReaderMode(this)
    }

    override fun onTagDiscovered(tag: Tag?) {
        val isoDep = IsoDep.get(tag)
        isoDep.connect()
        var response = isoDep.transceive(Utils.hexStringToByteArray("00A40004023F0420"))
        var response2 = isoDep.transceive(Utils.hexStringToByteArray(
            "00B0000050"))
        runOnUiThread { textView.append("\nCard Response: " + Utils.toHex(response)) }
        runOnUiThread { textView.append("\nCard Response: "
                + Utils.toHex(response2)) }

        isoDep.close()
    }

}