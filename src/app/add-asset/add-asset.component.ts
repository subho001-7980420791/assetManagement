import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CountryService } from '@services/country.service';
import { BackendService } from '@services/backend.service';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent implements OnInit{
  dataSource:any[]=[];
  showPopup:boolean=false
  users:any[]=[]
  country:any[]=[]
  public asset:FormGroup = this.fb.group({
    stickerId: ['',Validators.required],
      allocatedRoomId:['',Validators.required],
      currentRoomId:['',Validators.required],
      allocatedUserId:['',Validators.required],
      assetModelName:['',Validators.required],
      assetModelId:['',Validators.required],
      allocated:[true,Validators.required],
      isActive:[true,Validators.required],
      buildingId:['',Validators.required]
  })
  constructor(public countryService:CountryService,private fb: FormBuilder,private backEndService:BackendService) {
   }
 async ngOnInit(): Promise<void> {
  this.getCountry()
    this.getBuilding()
    this.getRoom()
    this.getUser()
    this.getAsset()
  }
  openDialog(): void {
    this.showPopup=true
  }
  closePopup(){
    this.showPopup=false
    this.asset.reset()
  }
  async onSubmit(){
      this.dataSource.push(this.asset.getRawValue())
      console.log(this.asset.getRawValue())
      await this.backEndService.makePostApiCall('asset',this.asset.getRawValue())
      this.asset.reset()
      this.countryService.allocatedRoomId=[]
      this.showPopup=false
  }
  change(event:any){
  //   this.asset.controls['allocated'].patchValue(true)
  //   this.asset.controls['isActive'].patchValue(true)
  //   this.countryService.allocatedRoomId=this.countryService.roomId.filter(x=>x.roomId!=event.target.value)
  //   if(this.asset.controls['currentRoomId'].value === this.asset.controls['allocatedRoomId'].value){
  //    if(this.asset.controls['currentRoomId'].value=='1')
  //    this.asset.controls['allocatedRoomId'].patchValue('2')
  //   else
  //   this.asset.controls['allocatedRoomId'].patchValue('1')
  // this.asset.controls['allocatedRoomId'].setErrors(null)
  //   return;
  //   }
  }
  async getBuilding(){
    const data=await this.backEndService.makeGetApiCall('building')
    console.log(data)
    if(data?.data?.length>0)
    {
      this.countryService.buildings=data.data
    }
  }
  async getRoom(){
    const data=await this.backEndService.makeGetApiCall('room')
    console.log(data)
    if(data?.data?.length>0)
    {
      this.countryService.roomId=data.data
    }
  }
  async getAsset(){
    const data=await this.backEndService.makeGetApiCall('asset')
    console.log(data)
    if(data?.data?.length>0)
    {
      this.dataSource=data.data
    }
  }
  async getUser(){
    const data=await this.backEndService.makeGetApiCall('user')
    console.log(data)
    if(data?.data?.length>0)
    {
      this.users=data.data
    }
  }

  convertToCSV() {
    const columnNames = [
      'Serial No',
      'Sticker Id',
      'Allocated Room Id',
      'Current Room Id',
      'Model Name',
      'Model Id',
      'Building Id',
      'User Name'
    ];

    const csvRows = [columnNames.join(',')]; // Adding column names as the first row

    this.dataSource.forEach((row, index) => {
      const csvRowValues = [
        index + 1,
        row.stickerId.replace(/,/g, ''),
        row.allocatedRoomId.replace(/,/g, ''),
        row.currentRoomId.replace(/,/g, ''),
        row.assetModelName.replace(/,/g, ''),
        row.assetModelId.replace(/,/g, ''),
        row.buildingId.replace(/,/g, ''),
        row.allocatedUserId.replace(/,/g, '')
      ];

      csvRows.push(csvRowValues.join(','));
    });

    const csvContent = csvRows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asset_data.csv';
    a.click();

    window.URL.revokeObjectURL(url);
  }


  convertToPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const columnNames = [
      'Serial No',
      'Sticker Id',
      'Allocated Room Id',
      'Current Room Id',
      'Model Name',
      'Model Id',
      'Building Id',
      'User Name'
    ];

    const tableRows = [columnNames];
    this.dataSource.forEach((row, index) => {
      const rowData = [
        index + 1,
        row.stickerId,
        row.allocatedRoomId,
        row.currentRoomId,
        row.assetModelName,
        row.assetModelId,
        row.buildingId,
        row.allocatedUserId
      ];
      tableRows.push(rowData);
    });

    const documentDefinition = {
      content: [
        {
          text: 'Asset Data Report',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: tableRows
          }
        }
      ],
      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 8, 0, 8]
        }
      }
    };

    (pdfMake as any).createPdf(documentDefinition).download('asset_data_report.pdf');
  }

  async getCountry(){
    const data=await this.backEndService.makeGetApiCall('country')
    console.log(data)
    if(data?.data?.length>0)
    {
      this.country=data.data
    }
  }
}
