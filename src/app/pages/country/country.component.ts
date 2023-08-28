//import { CountryDialogComponent } from './../country-dialog/country-dialog.component';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})


export class CountryComponent implements OnInit {
  dataSource:any[];
  buildingForm: FormGroup;
  users: { userId: number; userName: string; isActive: boolean; }[] = [];
  displayedColumns: string[] = ['countryId', 'country Name', 'Active status'];
  showPopup:any=false;
  constructor( private backend: BackendService) { }

  ngOnInit(): void {
    this.getCountry()
  }

  openDialog(): void {
    this.showPopup=true;
  }

  closeDialog() {
    this.showPopup = false;
    this.getCountry()
  }

  async getCountry(){
    const data=await this.backend.makeGetApiCall('country')
    if(data?.data?.length>0)
    {
      this.dataSource=data.data
    }
  }

  convertToCSV() {

    const columnNames = [
      'Country Id',
      'Country Name',
      'Active Status',

    ];
    const csvRows = [columnNames.join(',')]; // Adding column names as the first row
    this.dataSource.forEach((row, index) => {
      const csvRowValues = [
        index + 1,
        row.countryName,
        row.isActive
      ];
      csvRows.push(csvRowValues.join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Country_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const columnNames = [
      'Country Id',
      'Country Name',
      'Active Status',
    ];

    const tableRows = [columnNames];
    this.dataSource.forEach((row, index) => {
      const rowData = [
        index + 1,
        row.countryName,
        row.isActive,
      ];
      tableRows.push(rowData);
    });

    const documentDefinition = {
      content: [
        {
          text: 'Country Data Report',
          style: 'header'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto'],
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

    (pdfMake as any).createPdf(documentDefinition).download('country_data_report.pdf');
  }


}
