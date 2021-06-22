import {Injectable} from '@angular/core';
import {AngularFireLiteAuth, AngularFireLiteFirestore} from 'angularfire-lite';
import {first, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbService {
  public url = '123'

  constructor(public auth: AngularFireLiteAuth, public fs: AngularFireLiteFirestore) {
  }

  isAuth() {
    return this.auth.isAuthenticated();
  }

  signin(email, pass) {
    // console.log('11')
    return this.auth.signin(email, pass);
  }

  signup(email, pass) {
    // console.log('11')
    return this.auth.signup(email, pass);
  }


  getCities() {


    return this.auth.uid().pipe(switchMap((uid) => {
      // console.log('我进来了')
      // console.log(`${uid}`)
      console.log(this.fs.read(`${uid}`))
      return this.fs.read(`${uid}`);
    }));
  }

  addCity(name: string) {

    return this.auth.uid()
      .pipe(switchMap((uid) => {
        console.log(`${uid}/${name}`)


        return this.fs
          .write(`${uid}/${name}`, {name, added: new Date()})
          .pipe(first());
      }), first());
  }

}
