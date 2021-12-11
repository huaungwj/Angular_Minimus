import { Component, OnInit } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  errorMessage;

  constructor(public fb: FbService, public router: Router) {}

  ngOnInit() {}

  signup(e) {
    this.fb
      .signup(e.target.email.value, e.target.password.value)
      .pipe(first())
      .subscribe(
        (res) => {
          // console.log(res)

          // console.log('成功')
          this.router.navigateByUrl('');
        },
        (err) => {
          // console.log(err)
          this.errorMessage = err;
          if (this.errorMessage) {
            alert(this.errorMessage);
          }
          setTimeout(() => (this.errorMessage = ''), 2000);
        }
      );
  }
}
