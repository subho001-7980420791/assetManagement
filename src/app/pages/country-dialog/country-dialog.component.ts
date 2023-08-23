import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.buildingForm = this.formBuilder.group({
      countryName: ['',Validators.required],
      isActive: [true,Validators.required]
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
    await this.backend.makePostApiCall('country',newUser)
    this.onNoClick();
  }

  toggleIsActive() {
    const isActiveControl = this.buildingForm.get('isActive') as FormControl;
    isActiveControl.setValue(!isActiveControl.value);
  }


}
