import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';
import { BackendService } from '@services/backend.service';

@Component({
  selector: 'app-country-dialog',
  templateUrl: './country-dialog.component.html',
  styleUrls: ['./country-dialog.component.scss']
})
export class CountryDialogComponent implements OnInit {

  @Input() showPopup: any;
  @Output() closeDialog = new EventEmitter<void>();

  buildingForm: FormGroup;
  countries: { countryId: number; countryName: string; isActive: boolean; }[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private backendService:BackendService
  ) {}

  ngOnInit(): void {
    this.buildingForm = this.formBuilder.group({
      countryName: ['',Validators.required],
      isActive: ['']
    });
  }

  onNoClick(): void {
    this.closeDialog.emit();
  }


  async onOkClick(): Promise<void> {
    const newUser = {
      countryName: this.buildingForm.get('countryName')?.value,
      isActive: this.buildingForm.get('isActive')?.value,
    };
    this.userService.data.push(newUser); // Adding the new user to the array
    await this.backendService.makePostApiCall('country',newUser)
    this.onNoClick();
  }

  toggleIsActive() {
    const isActiveControl = this.buildingForm.get('isActive') as FormControl;
    isActiveControl.setValue(!isActiveControl.value);
  }

}
