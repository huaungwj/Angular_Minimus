import { Component, OnInit } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  constructor(
    public storage: StorageService,
    public fb: FbService,
    public router: Router
  ) {}

  ngOnInit() {}

  login(e) {
    this.fb
      .signin(e.target.email.value, e.target.password.value)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res.user);
          this.storage.set('user', { email: res.user.email });
          this.router.navigateByUrl('');
        },
        (err) => {
          this.errorMessage = err;
          if (this.errorMessage) {
            alert(this.errorMessage);
          }
          setTimeout(() => (this.errorMessage = ''), 2000);
        }
      );
  }
}
