
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '@services/backend.service';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  @Input() showPopup: any;
  @Output() closeDialog = new EventEmitter<void>();
  buildingForm: FormGroup;
  users: { userId: number; userName: string; isActive: boolean; }[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.buildingForm = this.formBuilder.group({
      userName: ['',Validators.required],
      isActive: [true,Validators.required]
    });
  }

  onNoClick(): void {
    this.closeDialog.emit();
  }

  async onOkClick(): Promise<void> {
    const newUser = {
      userName: this.buildingForm.get('userName')?.value,
      isActive: this.buildingForm.get('isActive')?.value,
    };
    await this.backend.makePostApiCall('user',newUser)

    this.onNoClick();
  }

  toggleIsActive() {
    const isActiveControl = this.buildingForm.get('isActive') as FormControl;
    isActiveControl.setValue(!isActiveControl.value);
  }

  
}
