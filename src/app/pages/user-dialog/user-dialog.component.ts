
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';


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
    private userService: UserService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.buildingForm = this.formBuilder.group({
      userName: ['',Validators.required],
      isActive: ['']
    });
  }

  onNoClick(): void {
    this.closeDialog.emit();
  }

  onOkClick(): void {
    const newUser = {
      userName: this.buildingForm.get('userName')?.value,
      isActive: this.buildingForm.get('isActive')?.value,
    };
    this.userService.data.push(newUser); // Adding the new user to the array
    this.onNoClick();
  }

  toggleIsActive() {
    const isActiveControl = this.buildingForm.get('isActive') as FormControl;
    isActiveControl.setValue(!isActiveControl.value);
  }


}
