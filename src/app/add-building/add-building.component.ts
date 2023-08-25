import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '@services/country.service';
import { BackendService } from '@services/backend.service';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent implements OnInit{
  displayedColumns: string[] = ['Room', 'Country', 'Building', 'Address'];
  dataSource:any[];
  showPopup:boolean=false
  country:any[]=[]
  public buildingDetails:FormGroup = this.fb.group({
    buildingName: ['',Validators.required],
      countryName:['',Validators.required],
      countryId:['',Validators.required],
      address:['',Validators.required],
      isActive:[true,Validators.required]
  })
  constructor(public countryService:CountryService,private fb: FormBuilder,private backEndService:BackendService) {
   }
  async ngOnInit(): Promise<void> {
    this.getCountry()
     this.getBuildings()
  }
  openDialog(): void {
    this.showPopup=true
  }
  closePopup(){
    this.showPopup=false
    this.buildingDetails.reset()
  }
  async onSubmit(){
      this.dataSource.push(this.buildingDetails.getRawValue())
      await this.backEndService.makePostApiCall('building',this.buildingDetails.getRawValue())
      this.buildingDetails.reset()
      this.showPopup=false
  }
  change(event:any){
    let countrySelected=this.country.filter(x=>x.countryName===event.target.value)
    this.buildingDetails.get('countryName')?.patchValue(countrySelected[0]['countryName'])
    this.buildingDetails.get('countryId')?.patchValue(countrySelected[0]['countryId'])
    this.buildingDetails.get('isActive')?.patchValue(true)
    console.log(this.buildingDetails.getRawValue())
  }
  async getBuildings(){
    const data=await this.backEndService.makeGetApiCall('building')
    if(data?.data?.length>0)
    {
      this.dataSource=data.data
    }
  }
  async getCountry(){
    const data=await this.backEndService.makeGetApiCall('country')
    if(data?.data?.length>0)
    {
      this.country=data.data
    }
  }

  convertToCSV() {
    const columnNames = [
      'Serial No',
      'Building Name',
      'Country',
      'Address',
    ];
    const csvRows = [columnNames.join(',')]; // Adding column names as the first row
    this.dataSource.forEach((row, index) => {
      const csvRowValues = [
        index + 1,
        row.buildingName,
        row.countryName,
        row.address,
      ];
      csvRows.push(csvRowValues.join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'building_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const columnNames = [
      'Serial No',
      'Building Name',
      'Country',
      'Address',
    ];

    const tableRows = [columnNames];
    this.dataSource.forEach((row, index) => {
      const rowData = [
        index + 1,
        row.buildingName,
        row.countryName,
        row.address,
      ];
      tableRows.push(rowData);
    });

    const documentDefinition = {
      content: [
        {
          text: 'Building Data Report',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto'],
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

    (pdfMake as any).createPdf(documentDefinition).download('building_data_report.pdf');
  }


}
