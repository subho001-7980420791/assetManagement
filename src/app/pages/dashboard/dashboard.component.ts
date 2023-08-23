import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '@services/backend.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 countryCount:number;
 assetCount:number;
 userCount:number;
 roomCount:number;
 buildingCount:number;
  constructor(private router: Router,private backend :BackendService) {}
  ngOnInit(): void {
    this.getCounts()
  }


  navigateToUserComponent() {
    this.router.navigate(['home/user']);
  }
  navigateToCountryComponent(){
    this.router.navigate(['home/country']);
  }
  async getCounts(){
    const data=await this.backend.makeGetApiCall('allCount')
    if(data)
    {
      this.assetCount=data.asset;
      this.buildingCount=data.building;
      this.countryCount=data.country;
      this.roomCount=data.room;
      this.userCount=data.user;
    } 
  }
}
