import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  region:any[]=["Europe","America","Asia"]
  countries=[
    {    
      countryId:1,
      countryName:"India",
      isActive:true,
    },
    {    
      countryId:2,
      countryName:"Bangladesh",
      isActive:true,
    },
    {    
      countryId:3,
      countryName:"USA",
      isActive:true,
    },
  ]
  buildings=[]
  roomId:any[]=[]
  allocatedRoomId:any[]=[]
  buildingId:any[]=[]
  data: any[] = [];
  assets:any[]=[]
  constructor() { }
}
