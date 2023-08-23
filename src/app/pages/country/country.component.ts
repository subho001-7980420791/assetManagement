//import { CountryDialogComponent } from './../country-dialog/country-dialog.component';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})


export class CountryComponent implements OnInit {

  buildingForm: FormGroup;
  users: { userId: number; userName: string; isActive: boolean; }[] = [];
  displayedColumns: string[] = ['countryId', 'country Name', 'Active status'];
  showPopup:any=false;
  constructor(public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.buildingForm);
    this.buildingForm = this.formBuilder.group({
      //userId: [''],
      countryName:['', Validators.required],
      isActive:['']
    });
  }

  openDialog(): void {
    this.showPopup=true;
  }

  closeDialog() {
    this.showPopup = false;
  }
}