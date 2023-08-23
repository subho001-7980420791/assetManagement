import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users=[
    {
      userId:1,
      userName:"swagata",
      isActive:true,
      assetsAllocated: true,
    },
    {
      userId:2,
      userName:"avigyan",
      isActive:true,
      assetsAllocated: true,
    },
    {
      userId:3,
      userName:"mili",
      isActive:true,
      assetsAllocated: true,
    }
  ]

  data: any[] = [];


  constructor() { }
}
