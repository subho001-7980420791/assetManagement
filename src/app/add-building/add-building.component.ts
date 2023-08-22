import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '@services/country.service';
@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.scss']
})
export class AddBuildingComponent {
  displayedColumns: string[] = ['Room', 'Country', 'Building', 'Address'];
  dataSource:any[]=[];
  showPopup:boolean=false
  country:any[]=[]
  public buildingDetails:FormGroup = this.fb.group({
    buildingName: ['',Validators.required],
      countryName:['',Validators.required],
      countryId:['',Validators.required],
      address:['',Validators.required]    
  })
  constructor(public countryService:CountryService,private fb: FormBuilder) {
   }
  ngOnInit(): void {
    this.country=this.countryService.countries
    
  }
  openDialog(): void {
    this.showPopup=true
  }
  closePopup(){
    this.showPopup=false
  }
  onSubmit(){
      this.dataSource.push(this.buildingDetails.getRawValue())
      this.buildingDetails.reset()
      this.showPopup=false
  }
  change(event:any){
    let countrySelected=this.country.filter(x=>x.countryName===event.target.value)
    this.buildingDetails.get('countryName')?.patchValue(countrySelected[0]['countryName'])
    this.buildingDetails.get('countryId')?.patchValue(countrySelected[0]['countryId'])
  }   
}
