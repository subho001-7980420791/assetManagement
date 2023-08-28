import { Component, OnInit } from '@angular/core';
import { BackendService } from '@services/backend.service';
import { Validators, FormBuilder} from '@angular/forms';
import  pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  users: { userId: number; userName: string; isActive: boolean; }[] = [];
  displayedColumns: string[] = ['userId', 'user Name', 'Active status'];
  showPopup:any=false;
  dataSource:any[];
  constructor(private backend: BackendService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  openDialog(): void {
    this.showPopup=true;
  }

  async closeDialog() {
    this.showPopup = false;
    await this.getUsers()
  }
  async getUsers(){
    const data=await this.backend.makeGetApiCall('user')
    if(data?.data?.length>0)
    {
      this.dataSource=data.data
    }
  }

  convertToCSV() {

    const columnNames = [
      'User Id',
      'User Name',
      'Active Status',

    ];
    const csvRows = [columnNames.join(',')]; // Adding column names as the first row
    this.dataSource.forEach((row, index) => {
      const csvRowValues = [
        index + 1,
        row.userName,
        row.isActive,
      ];
      csvRows.push(csvRowValues.join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'User_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const columnNames = [
      'User Id',
      'User Name',
      'Active Status',
    ];

    const tableRows = [columnNames];
    this.dataSource.forEach((row, index) => {
      const rowData = [
        index + 1,
        row.userName,
        row.isActive,
      ];
      tableRows.push(rowData);
    });

    const documentDefinition = {
      content: [
        {
          text: 'User Data Report',
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

    (pdfMake as any).createPdf(documentDefinition).download('user_data_report.pdf');
  }
}
