import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '@services/country.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit{
  displayedColumns: string[] = ['Room', 'Country', 'Building', 'Address'];
  dataSource:any[]=[];
  showPopup:boolean=false
  building:any[]=[]
  public factory:FormGroup = this.fb.group({
    roomName: ['', Validators.required],
    buildingDetails: this.fb.group({
      countryId:['', Validators.required],
      buildingId:['', Validators.required],
      countryName:['', Validators.required],
      buildingName:['', Validators.required],
      address:['', Validators.required],
      isActive:[true, Validators.required],
    })
  })
  constructor(public countryService:CountryService,private fb: FormBuilder) {
   }
  ngOnInit(): void {
    this.building=this.countryService.buildings
    
  }
  openDialog(): void {
    this.showPopup=true
  }
  closePopup(){
    this.showPopup=false
  }
  onSubmit(){
      this.dataSource.push(this.factory.getRawValue())
      this.showPopup=false
  }
  change(event:any){
    let buildingSelected=this.building.filter(x=>x.buildingName===event.target.value)
    this.factory.get('buildingDetails')?.get('buildingId')?.patchValue(buildingSelected[0]['buildingId'])
    this.factory.get('buildingDetails')?.get('countryId')?.patchValue(buildingSelected[0]['countryId'])
    this.factory.get('buildingDetails')?.get('countryName')?.patchValue(buildingSelected[0]['countryName'])
    this.factory.get('buildingDetails')?.get('address')?.patchValue(buildingSelected[0]['address'])
  }
}
