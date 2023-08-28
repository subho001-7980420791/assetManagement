import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '@services/country.service';
import { BackendService } from '@services/backend.service';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit{
  displayedColumns: string[] = ['Room', 'Country', 'Building', 'Address'];
  dataSource:any[]=[];
  showPopup:boolean=false
  building:any[]=[]
  public factory:FormGroup = this.fb.group({
    roomName: ['', Validators.required],
    buildingDetails: this.fb.group({
      countryId:['', Validators.required],
      buildingId:['', Validators.required],
      countryName:['', Validators.required],
      buildingName:['', Validators.required],
      address:['', Validators.required],
      isActive:[true, Validators.required],
    })
  })
  constructor(public countryService:CountryService,private fb: FormBuilder,public backEndService:BackendService) {
   }
  async ngOnInit(): Promise<void> {
     this.getBuilding()
     this.getRoom()
  }
  openDialog(): void {
    this.showPopup=true
  }
  closePopup(){
    this.showPopup=false
    this.factory.reset()
  }
  async onSubmit(){
      this.dataSource.push(this.factory.getRawValue())
      await this.backEndService.makePostApiCall('room',this.factory.getRawValue())
      this.showPopup=false
  }
  change(event:any){
    console.log(event.target.value)
    let buildingSelected=this.building.filter(x=>x.buildingName===event.target.value)
    this.factory.get('buildingDetails')?.get('buildingId')?.patchValue(buildingSelected[0]['buildingId'])
    this.factory.get('buildingDetails')?.get('countryId')?.patchValue(buildingSelected[0]['countryId'])
    this.factory.get('buildingDetails')?.get('countryName')?.patchValue(buildingSelected[0]['countryName'])
    this.factory.get('buildingDetails')?.get('address')?.patchValue(buildingSelected[0]['address'])
  }
  async getBuilding(){
    const data=await this.backEndService.makeGetApiCall('building')
    console.log(data.data)
    if(data?.data?.length>0)
    {
      this.building=data.data
    }
  }
  async getRoom(){
    const data=await this.backEndService.makeGetApiCall('room')
    console.log(data)
    if(data?.data?.length>0)
    {
      this.dataSource=data.data
    }
  }

  convertToCSV() {

    const columnNames = [
      'Serial No',
      'Room Name',
      'Country Name',
      'Building Name',
      'Address'
    ];
    const csvRows = [columnNames.join(',')]; // Adding column names as the first row
    this.dataSource.forEach((row, index) => {
      const csvRowValues = [
        index + 1,
        row.roomName,
        row.buildingDetails.countryName,
        row.buildingDetails.buildingName,
        row.buildingDetails.address,
      ];
      csvRows.push(csvRowValues.join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'room_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const columnNames = [
      'Serial No',
      'Room',
      'Country',
      'Building',
      'Address',
    ];

    const tableRows = [columnNames];
    this.dataSource.forEach((row, index) => {
      const rowData = [
        index + 1,
        row.roomName,
        row.buildingDetails.countryName,
        row.buildingDetails.buildingName,
        row.buildingDetails.address,
      ];
      tableRows.push(rowData);
    });

    const documentDefinition = {
      content: [
        {
          text: 'Room Data Report',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
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

    (pdfMake as any).createPdf(documentDefinition).download('room_data_report.pdf');
  }
}
