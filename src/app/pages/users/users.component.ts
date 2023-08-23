import { UserDialogComponent } from '@pages/user-dialog/user-dialog.component';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@services/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {

  buildingForm: FormGroup;
  users: { userId: number; userName: string; isActive: boolean; }[] = [];
  displayedColumns: string[] = ['userId', 'user Name', 'Active status'];
  showPopup:any=false;
  constructor(public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.buildingForm);
    this.buildingForm = this.formBuilder.group({
      //userId: [''],
      userName:['', Validators.required],
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
