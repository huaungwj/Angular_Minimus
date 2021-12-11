import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public data: any = '123';

  constructor() {}

  // tslint:disable-next-line:typedef
  set(key: any, value: any) {
    // @ts-ignore
    localStorage.setItem(key, JSON.stringify(value));
  }

  // tslint:disable-next-line:typedef
  removeone(key: any) {
    localStorage.removeItem(key);
  }
  // tslint:disable-next-line:typedef
  removeAll() {
    // @ts-ignore
    // tslint:disable-next-line:prefer-const
    localStorage.clear();
  }

  // tslint:disable-next-line:typedef
  get(key: any) {
    // return 'this is a service';

    return JSON.parse(localStorage.getItem(key));
  }
}
