import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  region:any[]=["Europe","America","Asia"]
  countries=[  ]
  buildings=[]
  roomId:any[]=[]
  allocatedRoomId:any[]=[]
  buildingId:any[]=[]
  data: any[] = [];
  assets:any[]=[]
  constructor() { }
}
