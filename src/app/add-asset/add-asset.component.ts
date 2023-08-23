import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CountryService } from '@services/country.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.scss']
})
export class AddAssetComponent {
  dataSource:any[]=[];
  showPopup:boolean=false
  country:any[]=[]
  public asset:FormGroup = this.fb.group({
    stickerId: ['',Validators.required],
      allocatedRoomId:['',Validators.required],
      currentRoomId:['',Validators.required],
      //allocatedUserId:['',Validators.required],
      assetModelName:['',Validators.required],
      assetModelId:['',Validators.required],
      allocated:[true,Validators.required],
      isActive:[true,Validators.required],
      buildingId:['',Validators.required]    
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
      this.dataSource.push(this.asset.getRawValue())
      this.asset.reset()
      this.countryService.allocatedRoomId=[]
      this.showPopup=false
  }
  change(event:any){
    this.countryService.allocatedRoomId=this.countryService.roomId.filter(x=>x!=event.target.value)
    if(this.asset.controls['currentRoomId'].value === this.asset.controls['allocatedRoomId'].value){
     if(this.asset.controls['currentRoomId'].value=='1')
     this.asset.controls['allocatedRoomId'].patchValue('2')
    else
    this.asset.controls['allocatedRoomId'].patchValue('1')
  this.asset.controls['allocatedRoomId'].setErrors(null)
    return;
    }
  }
}