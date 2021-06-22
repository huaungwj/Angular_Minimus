import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeToggleService {

  public flag:boolean = false; // false 是关闭状态

  constructor() { }

  toggleDark(){

    this.flag  = !this.flag

    console.log(this.flag)
  }

}
