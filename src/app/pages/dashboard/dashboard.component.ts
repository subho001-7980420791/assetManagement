import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private router: Router) {}


  navigateToUserComponent() {
    this.router.navigate(['home/user']);
  }
  navigateToCountryComponent(){
    this.router.navigate(['home/country']);
  }
}
