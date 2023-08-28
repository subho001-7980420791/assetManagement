import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-qr-component',
  templateUrl: './qr-component.component.html',
  styleUrls: ['./qr-component.component.scss']
})
export class QrComponentComponent implements OnInit {
  qrData = "https://www.facebook.com/"
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  ngOnInit(): void {
   
  }

}
