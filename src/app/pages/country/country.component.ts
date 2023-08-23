//import { CountryDialogComponent } from './../country-dialog/country-dialog.component';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';


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
}
