import { Component, OnInit } from '@angular/core';
import { BackendService } from '@services/backend.service';


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
}
